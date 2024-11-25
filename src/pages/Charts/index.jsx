import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  VStack,
  SimpleGrid,
  Alert,
  AlertIcon,
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
  if (chartData?.xAxis?.categories) {
    const categoryCount = chartData.xAxis.categories.length;
    if (id === "reporterSignsSymptomsRChart") {
      return `${Math.max(400, categoryCount * 60)}px`;
    }
  }
  return "400px";
};

const ChartWrapper = ({ id, queryFn, styles }) => {
  const { data, isLoading, error } = useQuery({
    ...queryFn,
    staleTime: Infinity, // Предотвращаем автоматическое обновление
    cacheTime: Infinity, // Храним данные в кеше
  });

  // Мемоизируем опции графика
  const chartOptions = useMemo(() => {
    if (!data) return null;

    if (Array.isArray(data)) {
      return data.map(chartData => ({
        ...chartData.chartConfig,
        chart: {
          ...chartData.chartConfig.chart,
          height: calculateChartHeight(chartData.chartConfig, id),
          animation: false, // Отключаем анимацию
        },
        plotOptions: {
          ...chartData.chartConfig.plotOptions,
          series: {
            ...chartData.chartConfig.plotOptions?.series,
            animation: false, // Отключаем анимацию для серий
          }
        }
      }));
    }

    return {
      ...data,
      chart: {
        ...data.chart,
        height: calculateChartHeight(data, id),
        animation: false,
      },
      plotOptions: {
        ...data.plotOptions,
        series: {
          ...data.plotOptions?.series,
          animation: false,
        }
      }
    };
  }, [data, id]);

  if (isLoading) {
    return (
      <Box id={id} width="100%" height={styles?.height || "auto"} {...styles}>
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

  if (
    !data ||
    ([
      "levodopaResponseChart",
      "countryPieChart",
      "ethnicityPieChart",
      "initialSignsAndSymptomsChart",
    ].includes(id) &&
      !data?.series?.[0]?.data?.length)
  ) {
    return null;
  }

  if (Array.isArray(chartOptions)) {
    return (
      <VStack spacing={8} align="stretch" width="100%">
        {chartOptions.map((options, index) => (
            <Box key={`${id}-${index}`} width="100%">
            <Box height={options.chart.height}>
                <HighchartsReact
                  highcharts={Highcharts}
                options={options}
                updateArgs={[true, true, true]} // Принудительное обновление
                />
              </Box>
            </Box>
        ))}
      </VStack>
    );
  }

  return (
    <Box id={id} width="100%" height={chartOptions.chart.height} {...styles}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        updateArgs={[true, true, true]}
      />
    </Box>
  );
};

const Charts = ({ geneName, filters }) => {
  const [disease, gene] = geneName.split("-");

  const chartConfigs = useMemo(() => [
    {
      id: "reporterSignsSymptomsRChart",
      queryFn: reporterSignsSymptomsResponseQuery(disease, gene, filters),
      styles: { width: "100%" },
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
  ], [disease, gene, filters]);

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
