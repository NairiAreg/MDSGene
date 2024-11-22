/* eslint-disable no-eval */
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const appendFilters = (params, filters) => {
  const { filterCriteria, aao, countries, mutations } = filters;
  if (filterCriteria !== undefined)
    params.append("filter_criteria", filterCriteria);
  if (aao !== undefined) params.append("aao", aao);
  if (countries) {
    // Check if countries is a string, otherwise join the array
    if (typeof countries === "string") {
      params.append("countries", countries);
    } else if (Array.isArray(countries) && countries.length > 0) {
      params.append("countries", countries.join(","));
    }
  }
  if (mutations) {
    if (typeof mutations === "string") {
      params.append("mutations", mutations);
    } else if (Array.isArray(mutations) && mutations.length > 0) {
      params.append("mutations", mutations.join(","));
    }
  }
};

export const uniqueStudiesQuery = (dba, gba, filters = {}) => ({
  queryKey: ["uniqueStudies", dba, gba, filters],
  queryFn: async () => {
    const params = new URLSearchParams();
    appendFilters(params, filters);

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
    if (
      typeof response.data?.[0]?.[0]?.positiveFunctionalEvidence?.[0] ===
      "number"
    ) {
      response.data[0][0].positiveFunctionalEvidence[0] += "";
    }

    return response.data?.[0] || [];
  },
});

const createFilteredQuery =
  (endpoint, processResponse = (data) => data) =>
  (disease, gene, filters = {}) => ({
    queryKey: [endpoint, disease, gene, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        disease_abbrev: disease,
        gene,
        directory: "excel",
      });
      appendFilters(params, filters);

      const response = await axios.get(
        `${BASE_URL}/${endpoint}?${params.toString()}`
      );
      return processResponse(response.data);
    },
  });

export const aaoEmpiricalDistributionQuery = createFilteredQuery(
  "aao_empirical_distribution",
  (data) => {
    if (!data) {
      return null;
    }
    data.yAxis.labels.formatter = eval(
      `(${data.yAxis.labels.formatter.__function})`
    );
    return data;
  }
);

export const ethnicityPieChartQuery = createFilteredQuery(
  "ethnicity_pie_chart"
);

export const countryPieChartQuery = createFilteredQuery("country_pie_chart");

export const levodopaResponseQuery = createFilteredQuery("levodopa_response");

export const initialSignsAndSymptomsResponseQuery = createFilteredQuery(
  "initial_signs_symptoms"
);

export const aaoDistributionResponseQuery =
  createFilteredQuery("aao_histogram");

export const reporterSignsSymptomsResponseQuery = createFilteredQuery(
  "reporter_signs_symptoms",
  (data) => {
    if (!data) {
      return null;
    }

    if (Array.isArray(data)) {
      return data.map((chartGroup) => ({
        name: chartGroup.name,
        chartConfig: {
          ...chartGroup.chartConfig,
          plotOptions: {
            ...chartGroup.chartConfig.plotOptions,
            series: {
              ...chartGroup.chartConfig.plotOptions.series,
              dataLabels: {
                ...chartGroup.chartConfig.plotOptions.series.dataLabels,
                formatter: eval(
                  `(${chartGroup.chartConfig.plotOptions.series.dataLabels.formatter.__function})`
                ),
              },
            },
          },
          tooltip: {
            ...chartGroup.chartConfig.tooltip,
            formatter: eval(
              `(${chartGroup.chartConfig.tooltip.formatter.__function})`
            ),
          },
        },
      }));
    }

    return {
      ...data,
      plotOptions: {
        ...data.plotOptions,
        series: {
          ...data.plotOptions.series,
          dataLabels: {
            ...data.plotOptions.series.dataLabels,
            formatter: eval(
              `(${data.plotOptions.series.dataLabels.formatter.__function})`
            ),
          },
        },
      },
      tooltip: {
        ...data.tooltip,
        formatter: eval(`(${data.tooltip.formatter.__function})`),
      },
    };
  }
);

export const worldMapChartQuery = createFilteredQuery("world_map");

export const publicationDataQuery = (pubmedIds) => ({
  queryKey: ["publicationData", pubmedIds],
  queryFn: async () => {
    if (!pubmedIds.length) return {};
    const response = await axios.get(
      `${BASE_URL}/search_pubmed?pubmed_ids=${pubmedIds.join(",")}`
    );
    return response.data.result;
  },
});

export const studyDetailsQuery = (disease, gene, pmid) => ({
  queryKey: ["studyDetails", disease, gene, pmid],
  queryFn: async () => {
    const response = await axios.get(
      `${BASE_URL}/patients_for_publication?disease_abbrev=${disease}&gene=${gene}&pmid=${pmid}`
    );
    return response.data;
  },
});

export const getSymptomCategories = async () => {
  const response = await axios.get(`${BASE_URL}/symptom_categories`);
  return response.data;
};

export const sendSymptoms = async (data) => {
  const response = await axios.post(`${BASE_URL}/submit_symptoms`, data);
  return response.data;
};
