import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { worldMapChartQuery } from "api/api-service";
import CustomSpinner from "components/CustomSpinner";

highchartsMap(Highcharts);

const ChartWrapper = ({ id, options, styles, isWorldMap = false }) => {
  useEffect(() => {
    if (isWorldMap && options) {
      fetch("https://code.highcharts.com/mapdata/custom/world.topo.json")
        .then((response) => response.json())
        .then((topology) => {
          Highcharts.mapChart(id, {
            ...options,
            chart: {
              ...options.chart,
              height: styles?.height || "400px",
              map: topology,
            },
            series: [{ ...options.series[0], mapData: topology }],
          });
        });
    }
  }, [options, id, isWorldMap, styles]);

  const chartOptions = {
    ...options,
    chart: { ...options.chart, height: styles?.height || "400px" },
  };

  return (
    <Box width="100%" height={styles?.height || "400px"} {...styles}>
      {isWorldMap ? (
        <div id={id} style={{ width: "100%", height: "100%" }} />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </Box>
  );
};

const Charts = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");

  const { data, isLoading, error } = useQuery(
    worldMapChartQuery(disease, gene)
  );

  if (isLoading)
    return <CustomSpinner mt="100px" type="DNA" color="#ac202d" size={200} />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  const { worldMap, mutations } = data;

  const mutationCharts = Object.entries(mutations).map(
    ([country, chartData]) => ({
      id: `mutation-${country}`,
      options: {
        ...chartData,
        chart: { ...chartData.chart, height: 600, width: null },
        title: {
          ...chartData.title,
          style: { ...chartData.title.style, fontSize: "16px" },
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
              },
            },
          },
        },
      },
      styles: { width: "100%", height: "600px" },
    })
  );

  return (
    <Box maxW="100%" mx="auto" p={5}>
      <Heading as="h1" size="xl" mb={4}>
        Charts for {geneName}
      </Heading>
      <VStack spacing={8} align="stretch">
        <ChartWrapper
          id="worldMapChart"
          options={worldMap}
          styles={{ height: "800px", width: "100%" }}
          isWorldMap={true}
        />
        <Heading as="h2" size="lg" mb={4}>
          Mutation Distribution by Country
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          {mutationCharts.map((chart) => (
            <ChartWrapper key={chart.id} {...chart} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Charts;
