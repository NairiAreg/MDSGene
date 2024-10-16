import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  VStack,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Link,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { PieChartIcon, GlobeIcon, ChevronDownIcon } from "lucide-react";
import MultiSelectDropdown from "components/MultiSelectDropdown";
import SingleSelectDropdown from "components/SingleSelectDropdown";
import { uniqueStudiesQuery, mutationDataQuery } from "api/api-service";
import { countries, filterOptions } from "utils/utils";
import CollapsibleMutations from "components/CollapsibleMutations";
import CustomSpinner from "components/CustomSpinner";
import Charts from "../Charts";
import WorldMap from "../WorldMap";
import AdvancedPagination from "components/AdvancedPagination";
import Search from "components/Search";

const Gene = () => {
  const { geneName } = useParams();
  const [disease, gene] = geneName.split("-");
  const {
    isOpen: isChartsOpen,
    onOpen: onChartsOpen,
    onClose: onChartsClose,
  } = useDisclosure();
  const {
    isOpen: isWorldMapOpen,
    onOpen: onWorldMapOpen,
    onClose: onWorldMapClose,
  } = useDisclosure();

  const [filters, setFilters] = useState({
    filterCriteria: 0,
    aao: 50,
    countries: [],
    mutations: [],
  });

  const [selectedPatientFilter, setSelectedPatientFilter] = useState({
    type: "all included patients",
    age: 50,
  });
  const [selectedMutations, setSelectedMutations] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedMutationData, setSelectedMutationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    ...uniqueStudiesQuery(disease, gene, filters),
    keepPreviousData: true,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (study) =>
        study?.pmid?.toString()?.includes(searchTerm) ||
        study?.study_design
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        study?.mutations?.some((mutationGroup) =>
          mutationGroup.some((mutation) =>
            mutation.type === "single"
              ? mutation.name.toLowerCase().includes(searchTerm.toLowerCase())
              : mutation.mutations.some((m) =>
                  m.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
          )
        )
    );
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    if (showAll) return filteredData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage, showAll]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleMutationClick = async (
    mutationName,
    genotype,
    pmid,
    mutation
  ) => {
    setIsModalOpen(true);
    try {
      const result = await queryClient.fetchQuery({
        ...mutationDataQuery(disease, gene, pmid, mutationName),
      });
      setSelectedMutationData({
        data: result,
        originalMutation: mutationName,
        fullMutationData: mutation,
      });
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
      mutations: selectedMutations,
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

  const getFilterParams = () => ({
    disease_abbrev: disease,
    gene,
    directory: "excel",
    filterCriteria: filters.filterCriteria,
    aao: filters.aao,
    countries: filters.countries.join(","),
    mutations: filters.mutations.join(","),
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (error) return <Text>An error occurred: {error.message}</Text>;

  const MutationDataDisplay = ({ data, originalMutation, fullData }) => (
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
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl" color="red.700">
            Overview of included studies for {geneName}:
          </Heading>
          <Flex gap={4}>
            <Button
              leftIcon={<PieChartIcon />}
              onClick={onChartsOpen}
              colorScheme="blue"
              variant="outline"
            >
              View Charts
            </Button>
            <Button
              leftIcon={<GlobeIcon />}
              onClick={onWorldMapOpen}
              colorScheme="green"
              variant="outline"
            >
              View World Map
            </Button>
          </Flex>
        </Flex>

        <VStack spacing={8} align="stretch">
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
                options={data?.flatMap((study) => study.mutations) || []}
                placeholder="Select mutations"
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

          <Divider />

          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Search onSearch={handleSearch} />
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                borderRadius="full"
              >
                {itemsPerPage} per page
              </MenuButton>
              <MenuList>
                {[5, 10, 20, 50, 100].map((value) => (
                  <MenuItem key={value} onClick={() => setItemsPerPage(value)}>
                    {value} per page
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>

          <Box overflowX="auto" boxShadow="md" borderRadius="lg">
            {isLoading ? (
              <Flex w="full" mt={5} justify="center">
                <CustomSpinner type="MG" color="#ac202d" size={200} />
              </Flex>
            ) : (
              <Table variant="simple" colorScheme="gray">
                <Thead bg="gray.50">
                  <Tr whiteSpace="pre">
                    <Th>Study</Th>
                    <Th>Study design</Th>
                    <Th>N cases</Th>
                    <Th>Ethnicities</Th>
                    <Th>Sex (% ♂)</Th>
                    <Th>Mean AAO (+/- SD)</Th>
                    <Th>Reported mutations</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedData
                    ?.filter(
                      ({ mutations }) =>
                        selectedMutations.length === 0 ||
                        mutations.some((mutationGroup) =>
                          mutationGroup.some((mutation) =>
                            mutation.type === "single"
                              ? selectedMutations.includes(mutation.name)
                              : mutation.mutations.some((m) =>
                                  selectedMutations.includes(m.name)
                                )
                          )
                        )
                    )
                    ?.map((study) => (
                      <Tr key={study.pmid}>
                        <Td whiteSpace="pre">
                          <Link
                            as={RouterLink}
                            color="blue.500"
                            to={`/genes/${geneName}/${study.pmid}`}
                          >
                            {study?.author_year}
                          </Link>
                        </Td>
                        <Td textTransform="capitalize">{study.study_design}</Td>
                        <Td>{study.number_of_cases}</Td>
                        <Td>
                          {study.ethnicity !== -99 ? study.ethnicity : "N/A"}
                        </Td>
                        <Td>
                          {study.proportion_of_male_patients === -99
                            ? "N/A"
                            : (study.proportion_of_male_patients * 100).toFixed(
                                2
                              ) + "%"}
                        </Td>
                        <Td whiteSpace="pre">
                          {study.mean_age_at_onset !== -99
                            ? `${study.mean_age_at_onset} ${
                                study.std_dev_age_at_onset
                                  ? `\n(+/- ${study.std_dev_age_at_onset})`
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
                                study.pmid,
                                study.full_mutations
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

          <Flex justify="space-between" align="center">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant={showAll ? "solid" : "outline"}
              colorScheme="blue"
              borderRadius="full"
            >
              {showAll ? "Show Paginated" : "Show All Results"}
            </Button>

            {!showAll && (
              <AdvancedPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </Flex>
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
                    fullData={selectedMutationData.fullMutationData}
                    originalMutation={selectedMutationData.originalMutation}
                  />
                )
              ) : (
                <CustomSpinner type="MG" color="#ac202d" size={200} />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isChartsOpen} onClose={onChartsClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Charts for {geneName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Charts geneName={geneName} filters={getFilterParams()} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isWorldMapOpen} onClose={onWorldMapClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>World Map for {geneName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <WorldMap geneName={geneName} filters={getFilterParams()} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default Gene;
