/* eslint-disable no-eval */
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const uniqueStudiesQuery = (dba, gba, filters = {}) => ({
  queryKey: ["uniqueStudies", dba, gba, filters],
  queryFn: async () => {
    const { filterCriteria, aao, countries, mutation } = filters;
    const params = new URLSearchParams();

    if (filterCriteria !== undefined)
      params.append("filter_criteria", filterCriteria);
    if (aao !== undefined) params.append("aao", aao);
    if (countries) params.append("countries", countries);
    if (mutation) params.append("mutation", mutation);

    const response = await axios.get(
      `${BASE_URL}/unique_studies/${dba}/${gba}${
        params.toString() ? `?${params.toString()}` : ""
      }`
    );
    return response.data;
  },
});

export const mutationDataQuery = (diseaseAbbrev, gene, pmid, mutP) => ({
  queryKey: ["mutationData", diseaseAbbrev, gene, pmid, mutP],
  queryFn: async () => {
    const params = new URLSearchParams({
      disease_abbrev: diseaseAbbrev,
      gene: gene,
      pmid: pmid,
      mut_p: mutP,
      directory: "excel",
    });

    const response = await axios.get(
      `${BASE_URL}/data_for_mutation?${params.toString()}`
    );
    return response.data;
  },
});

export const aaoEmpiricalDistributionQuery = (disease, gene) => ({
  queryKey: ["aaoEmpiricalDistribution", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/aao_empirical_distribution?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    const chartOptions = response.data;
    chartOptions.yAxis.labels.formatter = eval(
      `(${chartOptions.yAxis.labels.formatter.__function})`
    );
    return response.data;
  },
});

export const ethnicityPieChartQuery = (disease, gene) => ({
  queryKey: ["ethnicityPieChart", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/ethnicity_pie_chart?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    return response.data;
  },
});

export const countryPieChartQuery = (disease, gene) => ({
  queryKey: ["countryPieChart", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/country_pie_chart?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    return response.data;
  },
});

export const levodopaResponseQuery = (disease, gene) => ({
  queryKey: ["levodopaResponse", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/levodopa_response?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    return response.data;
  },
});

export const initialSignsAndSymptomsResponseQuery = (disease, gene) => ({
  queryKey: ["initialSignsAndSymptomsResponse", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/initial_signs_symptoms?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    return response.data;
  },
});

export const aaoDistributionResponseQuery = (disease, gene) => ({
  queryKey: ["aaoDistributionResponse", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/aao_histogram?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    return response.data;
  },
});

export const reporterSignsSymptomsResponseQuery = (disease, gene) => ({
  queryKey: ["reporterSignsSymptomsResponse", disease, gene],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/reporter_signs_symptoms?disease_abbrev=${disease}&gene=${gene}&directory=excel`
    );
    const chartOptions = response.data;
    chartOptions.plotOptions.series.dataLabels.formatter = eval(
      "(" +
        chartOptions.plotOptions.series.dataLabels.formatter.__function +
        ")"
    );
    chartOptions.tooltip.formatter = eval(
      "(" + chartOptions.tooltip.formatter.__function + ")"
    );

    return response.data;
  },
});
