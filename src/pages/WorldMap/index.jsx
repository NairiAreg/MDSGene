import React, { useEffect } from "react";
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

const ChartWrapper = ({ id, queryFn, styles, isWorldMap = false }) => {
  const { data, isLoading, error } = useQuery(queryFn);

  useEffect(() => {
    if (isWorldMap && data) {
      fetch("https://code.highcharts.com/mapdata/custom/world.topo.json")
        .then((response) => response.json())
        .then((topology) => {
          const chartOptions = {
            ...data.worldMap,
            chart: {
              ...data.worldMap.chart,
              height: styles?.height || "400px",
            },
          };
          chartOptions.chart.map = topology;
          chartOptions.series[0].mapData = topology;

          Highcharts.mapChart(id, chartOptions);
        });
    }
  }, [data, id, isWorldMap, styles]);

  if (isLoading) return <Spinner />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

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
    ...data,
    chart: {
      ...data.chart,
      height: styles?.height || "400px",
    },
  };

  return (
    <Box id={id} width="100%" height={styles?.height || "400px"} {...styles}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

const Charts = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");

  const chartConfigs = [
    {
      id: "worldMapChart",
      queryFn: worldMapChartQuery(disease, gene),
      styles: {
        height: "800px",
        width: "100%",
      },
      isWorldMap: true,
    },
  ];

  return (
    <Box maxW="100%" mx="auto" p={5}>
      <Heading as="h1" size="xl" mb={4}>
        Charts for {geneName}
      </Heading>
      <VStack spacing={8} align="stretch">
        <ChartWrapper {...chartConfigs[0]} />
        <SimpleGrid columns={2} spacing={4}>
          {chartConfigs.slice(1).map(({ id, queryFn, isWorldMap }) => (
            <ChartWrapper
              key={id}
              id={id}
              queryFn={queryFn}
              styles={{ width: "100%" }}
              isWorldMap={isWorldMap}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Charts;
