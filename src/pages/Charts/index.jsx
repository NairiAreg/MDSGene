import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  VStack,
  SimpleGrid,
  Alert,
  AlertIcon,
  Text,
  Divider,
} from "@chakra-ui/react";
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

const calculateChartHeight = (chartData, id) => {
  // Calculate height for bar charts with categories
  if (chartData.xAxis?.categories) {
    const categoryCount = chartData.xAxis.categories.length;
    // Special handling for symptoms charts
    if (
      id === "reporterSignsSymptomsRChart" ||
      id === "initialSignsAndSymptomsChart"
    ) {
      return `${Math.max(400, categoryCount * 60)}px`;
    }
  }
  return "400px"; // Default height for other charts
};

const ChartWrapper = ({ id, queryFn, styles }) => {
  const { data, isLoading, error } = useQuery(queryFn);

  if (isLoading) {
    return (
      <Box id={id} width="100%" height={styles?.height || "auto"} {...styles}>
        <CustomSpinner type="DNA" color="#ac202d" size={200} />
      </Box>
    );
  }

  if (error) {
    console.log(id, data);
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

  // Handle both single chart config and array of chart configs
  if (Array.isArray(data)) {
    return (
      <VStack spacing={8} align="stretch" width="100%">
        {data.map((chartData, index) => {
          const calculatedHeight = calculateChartHeight(
            chartData.chartConfig,
            id
          );
          const chartOptions = {
            ...chartData.chartConfig,
            chart: {
              ...chartData.chartConfig.chart,
              height: calculatedHeight,
            },
          };

          return (
            <Box key={`${id}-${index}`} width="100%">
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
                {chartData.name}
              </Text>
              <Box height={calculatedHeight}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              </Box>
              {index < data.length - 1 && <Divider mt={8} />}
            </Box>
          );
        })}
      </VStack>
    );
  }

  // Handle single chart config (for backward compatibility)
  const calculatedHeight = calculateChartHeight(data, id);
  const chartOptions = {
    ...data,
    chart: {
      ...data.chart,
      height: calculatedHeight,
    },
  };

  return (
    <Box id={id} width="100%" height={calculatedHeight} {...styles}>
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
        <Box width="100%">
          <ChartWrapper {...chartConfigs[0]} />
        </Box>
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
