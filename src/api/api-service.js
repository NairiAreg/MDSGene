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
