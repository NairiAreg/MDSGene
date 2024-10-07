// TODO add paginations and search
// Beautify Navbar and title
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
  Button,
} from "@chakra-ui/react";
import MultiSelectDropdown from "components/MultiSelectDropdown";
import SingleSelectDropdown from "components/SingleSelectDropdown";
import { uniqueStudiesQuery, mutationDataQuery } from "api/api-service";
import { countries, filterOptions } from "utils/utils";
import CollapsibleMutations from "components/CollapsibleMutations";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Gene = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");
  const navigate = useNavigate();
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
  const [selectedMutationData, setSelectedMutationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    ...uniqueStudiesQuery(disease, gene, filters),
    keepPreviousData: true,
  });

  const handleMutationClick = async (mutP, originalMutation, pmid) => {
    setIsModalOpen(true);
    try {
      const result = await queryClient.fetchQuery({
        ...mutationDataQuery(disease, gene, pmid, mutP),
      });
      setSelectedMutationData({ data: result, originalMutation });
    } catch (error) {
      console.error("Error fetching mutation data:", error);
      setSelectedMutationData({ error: "Failed to fetch mutation data" });
    }
  };

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

  const MutationDataDisplay = ({ data, originalMutation }) => (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Mutation: {originalMutation}
      </Text>
      {data.map((item, index) => (
        <Box key={index} borderWidth={1} borderRadius="md" p={4} mb={4}>
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Badge colorScheme="blue">{item["Gene name"]}</Badge>
            <Badge
              colorScheme={
                item["Pathogenicity scoring"] === "Pathogenic" ? "red" : "green"
              }
            >
              {item["Pathogenicity scoring"]}
            </Badge>
          </Flex>
          <Table size="sm">
            <Tbody>
              {Object.entries(item).map(([key, value]) => (
                <Tr key={key}>
                  <Th>{key}</Th>
                  <Td>
                    {Array.isArray(value)
                      ? value.join(", ")
                      : value === null
                      ? "N/A"
                      : value}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Flex gap={4}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={() => navigate("/?tab=genes")}
          mb={4}
          variant="outline"
        >
          Back to Genes
        </Button>
        <Button
          onClick={() => navigate(`/charts/${geneName}`)}
          mb={4}
          ml={4}
          variant="outline"
        >
          View Charts
        </Button>
      </Flex>
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
              <Spinner size="xl" />
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
                          as={RouterLink}
                          color="blue.500"
                          to={`/gene/${geneName}/${study.pmid}`}
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
                          mutations={study.mutations}
                          onMutationClick={(mutP, originalMutation) =>
                            handleMutationClick(
                              mutP,
                              originalMutation,
                              study.pmid
                            )
                          }
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mutation Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMutationData ? (
              selectedMutationData.error ? (
                <Text color="red.500">{selectedMutationData.error}</Text>
              ) : (
                <MutationDataDisplay
                  data={selectedMutationData.data}
                  originalMutation={selectedMutationData.originalMutation}
                />
              )
            ) : (
              <Spinner />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Gene;
