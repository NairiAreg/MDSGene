import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { worldMapChartQuery } from "api/api-service";

// Initialize the map module
highchartsMap(Highcharts);

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
  };

  return (
    <Box width="100%" height={styles?.height || "400px"} {...styles}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

const Charts = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");
  const [worldMapData, setWorldMapData] = useState(null);
  const [mutationCharts, setMutationCharts] = useState([]);

  const { data, isLoading, error } = useQuery(
    worldMapChartQuery(disease, gene)
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
              width: null, // Allow the chart to fill the container width
            },
            title: {
              ...chartData.title,
              style: {
                ...chartData.title.style,
                fontSize: "16px", // Increase title font size
              },
            },
            plotOptions: {
              ...chartData.plotOptions,
              pie: {
                ...chartData.plotOptions?.pie,
                dataLabels: {
                  ...chartData.plotOptions?.pie?.dataLabels,
                  style: {
                    ...chartData.plotOptions?.pie?.dataLabels?.style,
                    fontSize: "14px", // Increase data label font size
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

  if (isLoading) return <Spinner />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <Box maxW="100%" mx="auto" p={5}>
      <Heading as="h1" size="xl" mb={4}>
        Charts for {geneName}
      </Heading>
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

export default Charts;