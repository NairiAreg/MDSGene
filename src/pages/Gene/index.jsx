import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Link,
  Text,
  Spinner,
} from "@chakra-ui/react";
import MultiSelectDropdown from "components/MultiSelectDropdown";
import SingleSelectDropdown from "components/SingleSelectDropdown";
import { uniqueStudiesQuery } from "api/api-service";
import { countries, filterOptions, formatMutations } from "utils/utils";

const Gene = () => {
  const { geneName } = useParams();
  const [dba, gba] = geneName.split("-");
  const [filters, setFilters] = useState({
    filterCriteria: 0,
    aao: 50,
    countries: [],
    mutation: "",
  });
  const [selectedMutations, setSelectedMutations] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const { data, isLoading, error } = useQuery({
    ...uniqueStudiesQuery(dba, gba, filters),
    keepPreviousData: true,
  });

  console.log(filters);
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filterType === "patientFilter") {
        newFilters.filterCriteria = filterOptions.indexOf(value.type);
        if (value.type.includes("AAO")) {
          newFilters.aao = value.age;
        } else {
          delete newFilters.aao;
        }
      } else if (filterType === "country") {
        newFilters.countries = selectedCountries.map((country) =>
          Object.keys(countries).find((key) => countries[key] === country)
        );
      } else if (filterType === "mutation") {
        newFilters.mutation = value[0] || "";
      }

      return newFilters;
    });
  };

  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl">
          Overview of included studies for {geneName}:
        </Heading>

        <Flex justify="space-between" wrap="wrap" gap={4}>
          <Box width="48%">
            <SingleSelectDropdown
              options={filterOptions}
              placeholder="Select patient filter"
              label="Filter for"
              onChange={(value) => handleFilterChange("patientFilter", value)}
            />
          </Box>
          <Box width="48%">
            <MultiSelectDropdown
              options={[
                "Any mutation",
                ...new Set(
                  data?.flatMap((study) =>
                    Object.values(study.mutations).filter((mut) => mut !== -99)
                  ) || []
                ),
              ]}
              placeholder="Select mutation"
              label="carrying"
              onChange={(value) => handleFilterChange("mutation", value)}
              selectedItems={selectedMutations}
              setSelectedItems={setSelectedMutations}
            />
          </Box>
          <Box width="48%">
            <MultiSelectDropdown
              options={["All countries", ...Object.values(countries)]}
              placeholder="Select country"
              label="Country"
              selectedItems={selectedCountries}
              setSelectedItems={setSelectedCountries}
              onChange={(value) => handleFilterChange("country", value)}
            />
          </Box>
        </Flex>

        <Box overflowX="auto">
          {isLoading ? (
            <Flex w="full" mt={5} justify="center">
              <Spinner />
            </Flex>
          ) : (
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Study</Th>
                  <Th>Study design</Th>
                  <Th whiteSpace="pre">N cases</Th>
                  <Th>Ethnicities</Th>
                  <Th>Sex (% ♂)</Th>
                  <Th>Mean AAO (+/- SD)</Th>
                  <Th>Reported mutations</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((study) => (
                  <Tr key={study.pmid}>
                    <Td>
                      <Link
                        color="blue.500"
                        href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                        isExternal
                      >
                        {study.pmid}
                      </Link>
                    </Td>
                    <Td>{study.study_design}</Td>
                    <Td>{study.number_of_cases}</Td>
                    <Td>{study.ethnicity !== -99 ? study.ethnicity : "N/A"}</Td>
                    <Td>
                      {(study.proportion_of_male_patients * 100).toFixed(2)}%
                    </Td>
                    <Td>
                      {study.mean_age_at_onset !== -99
                        ? `${
                            study.mean_age_at_onset
                          } (+/- ${study.std_dev_age_at_onset?.toFixed(2)})`
                        : "N/A"}
                    </Td>
                    <Td>{formatMutations(study.mutations)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Gene;
