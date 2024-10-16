import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, VStack, SimpleGrid, Alert, AlertIcon } from "@chakra-ui/react";
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

  if (isLoading) {
    return (
      <Box id={id} width="100%" height={styles?.height || "400px"} {...styles}>
        <CustomSpinner type="DNA" color="#ac202d" size={200} />
      </Box>
    );
  }

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

const Charts = ({ geneName, filters }) => {
  const [disease, gene] = geneName.split("-");

  const chartConfigs = [
    {
      id: "reporterSignsSymptomsRChart",
      queryFn: reporterSignsSymptomsResponseQuery(disease, gene, filters),
      styles: {
        height: "1500px",
        width: "100%",
      },
    },
    {
      id: "aaoDistributionChart",
      queryFn: aaoDistributionResponseQuery(disease, gene, filters),
    },
    {
      id: "lineChart",
      queryFn: aaoEmpiricalDistributionQuery(disease, gene, filters),
    },
    {
      id: "initialSignsAndSymptomsChart",
      queryFn: initialSignsAndSymptomsResponseQuery(disease, gene, filters),
    },
    {
      id: "ethnicityPieChart",
      queryFn: ethnicityPieChartQuery(disease, gene, filters),
    },
    {
      id: "levodopaResponseChart",
      queryFn: levodopaResponseQuery(disease, gene, filters),
    },
    {
      id: "countryPieChart",
      queryFn: countryPieChartQuery(disease, gene, filters),
    },
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
