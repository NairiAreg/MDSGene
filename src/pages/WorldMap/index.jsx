import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { worldMapChartQuery } from "api/api-service";
import CustomSpinner from "components/CustomSpinner";

// Initialize the map module
highchartsMap(Highcharts);

const truncateText = (text, maxLength = 25) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const ChartWrapper = ({ id, options, styles, isWorldMap = false }) => {
  useEffect(() => {
    if (isWorldMap && options) {
      fetch("https://code.highcharts.com/mapdata/custom/world.topo.json")
        .then((response) => response.json())
        .then((topology) => {
          const chartOptions = {
            ...options,
            chart: {
              ...options.chart,
              height: styles?.height || "400px",
            },
          };
          chartOptions.chart.map = topology;
          chartOptions.series[0].mapData = topology;

          Highcharts.mapChart(id, chartOptions);
        });
    }
  }, [options, id, isWorldMap, styles]);

  if (isWorldMap) {
    return (
      <Box
        id={id}
        width="100%"
        height={styles?.height || "400px"}
        {...styles}
      />
    );
  }

  const chartOptions = {
    ...options,
    chart: {
      ...options.chart,
      height: styles?.height || "400px",
    },
    // Add tooltip formatter to show full text on hover
    tooltip: {
      ...options.tooltip,
      formatter: function () {
        return `<b>${this.point.name}</b>: ${this.percentage.toFixed(1)}%`;
      },
    },
    plotOptions: {
      ...options.plotOptions,
      pie: {
        ...options.plotOptions?.pie,
        dataLabels: {
          ...options.plotOptions?.pie?.dataLabels,
          formatter: function () {
            return truncateText(this.point.name);
          },
          style: {
            ...options.plotOptions?.pie?.dataLabels?.style,
            fontSize: "14px",
            textOverflow: "ellipsis",
          },
        },
      },
    },
  };

  return (
    <Box width="100%" height={styles?.height || "400px"} {...styles}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

const WorldMap = ({ geneName, filters }) => {
  const [disease, gene] = geneName.split("-");
  const [worldMapData, setWorldMapData] = useState(null);
  const [mutationCharts, setMutationCharts] = useState([]);

  const { data, isLoading, error } = useQuery(
    worldMapChartQuery(disease, gene, filters)
  );

  useEffect(() => {
    if (data) {
      setWorldMapData(data.worldMap);
      const mutationData = Object.entries(data.mutations).map(
        ([country, chartData]) => ({
          id: `mutation-${country}`,
          options: {
            ...chartData,
            chart: {
              ...chartData.chart,
              height: 600,
              width: null,
            },
            title: {
              ...chartData.title,
              style: {
                ...chartData.title.style,
                fontSize: "16px",
              },
            },
            // Add tooltip configuration
            tooltip: {
              pointFormat: "<b>{point.name}</b>: {point.percentage:.1f}%",
            },
            plotOptions: {
              ...chartData.plotOptions,
              pie: {
                ...chartData.plotOptions?.pie,
                dataLabels: {
                  ...chartData.plotOptions?.pie?.dataLabels,
                  style: {
                    ...chartData.plotOptions?.pie?.dataLabels?.style,
                    fontSize: "14px",
                    textOverflow: "ellipsis",
                  },
                },
              },
            },
          },
          styles: { width: "100%", height: "600px" },
        })
      );
      setMutationCharts(mutationData);
    }
  }, [data]);

  if (isLoading)
    return <CustomSpinner type="DNA" color="#ac202d" size={200} mt="40px" />;
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        An error occurred: {error.message}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert status="info">
        <AlertIcon />
        No data available for this chart with current filters. Try changing or
        removing filters
      </Alert>
    );
  }

  return (
    <Box maxW="100%" mx="auto" p={5}>
      <VStack spacing={8} align="stretch">
        <ChartWrapper
          id="worldMapChart"
          options={worldMapData}
          styles={{ height: "800px", width: "100%" }}
          isWorldMap={true}
        />
        <Heading as="h2" size="lg" mb={4}>
          Mutation Distribution by Country
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          {mutationCharts.map((chart) => (
            <ChartWrapper
              key={chart.id}
              id={chart.id}
              options={chart.options}
              styles={chart.styles}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default WorldMap;
