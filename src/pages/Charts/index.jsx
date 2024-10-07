import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
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

const ChartWrapper = ({ id, queryFn, styles }) => {
  const { data, isLoading, error } = useQuery(queryFn);

  if (isLoading) return <Spinner />;
  if (error) return <Text>An error occurred: {error.message}</Text>;
  const chartOptions = {
    ...data,
    chart: {
      ...data.chart,
      height: styles?.height || "400px",
    },
  };
  return (
    <Box id={id} width="100%" height="400px" {...styles}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

const Charts = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");

  const chartConfigs = [
    { id: "lineChart", queryFn: aaoEmpiricalDistributionQuery(disease, gene) },
    { id: "ethnicityPieChart", queryFn: ethnicityPieChartQuery(disease, gene) },
    { id: "countryPieChart", queryFn: countryPieChartQuery(disease, gene) },
    {
      id: "levodopaResponseChart",
      queryFn: levodopaResponseQuery(disease, gene),
    },
    {
      id: "initialSignsAndSymptomsChart",
      queryFn: initialSignsAndSymptomsResponseQuery(disease, gene),
    },
    {
      id: "aaoDistributionChart",
      queryFn: aaoDistributionResponseQuery(disease, gene),
    },
    {
      id: "reporterSignsSymptomsRChart",
      queryFn: reporterSignsSymptomsResponseQuery(disease, gene),
      styles: {
        height: "1500px",
      },
    },
  ];

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Heading as="h1" size="xl" mb={4}>
        Charts for {geneName}
      </Heading>
      <VStack spacing={8}>
        {chartConfigs.map(({ id, queryFn, styles }) => (
          <ChartWrapper key={id} id={id} queryFn={queryFn} styles={styles} />
        ))}
      </VStack>
    </Box>
  );
};

export default Charts;
