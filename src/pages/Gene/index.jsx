import React, { useEffect, useState } from "react";
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
import CollapsibleMutations from "components/CollapsibleMutations";

const Gene = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");
  const [filters, setFilters] = useState({
    filterCriteria: 0,
    aao: 50,
    countries: [],
    mutation: "",
  });

  const [selectedPatientFilter, setSelectedPatientFilter] = useState({
    type: "all included patients",
    age: 50,
  });
  const [selectedMutations, setSelectedMutations] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const { data, isLoading, error } = useQuery({
    ...uniqueStudiesQuery(disease, gene, filters),
    keepPreviousData: true,
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterCriteria: filterOptions.indexOf(selectedPatientFilter.type),
      aao: selectedPatientFilter.type.includes("AAO")
        ? selectedPatientFilter.age
        : prevFilters.aao,
    }));
  }, [selectedPatientFilter]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      mutation: selectedMutations[0] || "",
    }));
  }, [selectedMutations]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      countries: selectedCountries.map((country) =>
        Object.keys(countries).find((key) => countries[key] === country)
      ),
    }));
  }, [selectedCountries]);

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
              onChange={setSelectedPatientFilter}
            />
          </Box>
          <Box width="48%">
            <MultiSelectDropdown
              options={[
                ...new Set(
                  data?.flatMap((study) =>
                    Object.entries(study.mutations)
                      .filter(
                        ([key, mut]) => mut !== -99 && !key.includes("genotype")
                      )
                      .map(([, mut]) => mut)
                  ) || []
                ),
              ]}
              placeholder="Select mutation"
              label="carrying"
              selectedItems={selectedMutations}
              setSelectedItems={setSelectedMutations}
            />
          </Box>
          <Box width="48%">
            <MultiSelectDropdown
              options={Object.values(countries)}
              placeholder="Select country"
              label="Country"
              selectedItems={selectedCountries}
              setSelectedItems={setSelectedCountries}
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
                {data
                  ?.filter(
                    ({ mutations }) =>
                      selectedMutations.length === 0 ||
                      Object.values(mutations).some((e) =>
                        selectedMutations?.includes(e)
                      )
                  )
                  ?.map((study) => (
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
                      <Td>
                        {study.ethnicity !== -99 ? study.ethnicity : "N/A"}
                      </Td>
                      <Td>
                        {(study.proportion_of_male_patients * 100).toFixed(2)}%
                      </Td>
                      <Td whiteSpace="pre">
                        {study.mean_age_at_onset !== -99
                          ? `${study.mean_age_at_onset?.toFixed(2)} ${
                              study.std_dev_age_at_onset
                                ? `\n(+/- ${study.std_dev_age_at_onset?.toFixed(
                                    2
                                  )})`
                                : ""
                            }`
                          : "N/A"}
                      </Td>
                      <Td>
                        <CollapsibleMutations
                          mutations={formatMutations(study.mutations)}
                        />
                      </Td>
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
