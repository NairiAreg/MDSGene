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
