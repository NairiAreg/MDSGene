import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  aaoDistributionResponseQuery,
  aaoEmpiricalDistributionQuery,
  countryPieChartQuery,
  ethnicityPieChartQuery,
  initialSignsAndSymptomsResponseQuery,
  levodopaResponseQuery,
  reporterSignsSymptomsResponseQuery,
} from "api/api-service";
import CustomSpinner from "components/CustomSpinner";

const ChartWrapper = ({ id, queryFn, styles }) => {
  const { data, isLoading, error } = useQuery(queryFn);

  if (isLoading)
    return (
      <Box id={id} width="100%" height={styles?.height || "400px"} {...styles}>
        <CustomSpinner type="DNA" color="#ac202d" size={200} />
      </Box>
    );
  if (error) return <Text>An error occurred: {error.message}</Text>;
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
      id: "reporterSignsSymptomsRChart",
      queryFn: reporterSignsSymptomsResponseQuery(disease, gene),
      styles: {
        height: "1500px",
        width: "100%",
      },
    },
    {
      id: "aaoDistributionChart",
      queryFn: aaoDistributionResponseQuery(disease, gene),
    },
    { id: "lineChart", queryFn: aaoEmpiricalDistributionQuery(disease, gene) },
    {
      id: "initialSignsAndSymptomsChart",
      queryFn: initialSignsAndSymptomsResponseQuery(disease, gene),
    },
    { id: "ethnicityPieChart", queryFn: ethnicityPieChartQuery(disease, gene) },
    {
      id: "levodopaResponseChart",
      queryFn: levodopaResponseQuery(disease, gene),
    },
    { id: "countryPieChart", queryFn: countryPieChartQuery(disease, gene) },
  ];

  return (
    <Box maxW="100%" mx="auto" p={5}>
      <VStack spacing={8} align="stretch">
        <ChartWrapper {...chartConfigs[0]} />
        <SimpleGrid columns={2} spacing={4}>
          {chartConfigs.slice(1).map(({ id, queryFn }) => (
            <ChartWrapper
              key={id}
              id={id}
              queryFn={queryFn}
              styles={{ width: "100%" }}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Charts;
