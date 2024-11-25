import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Button,
  Text,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { countries } from "utils/utils";
import CustomSpinner from "components/CustomSpinner";
import CollapsibleMutations from "components/CollapsibleMutations";
import MutationDataDisplay from "components/MutationDataDisplay";
import { studyDetailsQuery, mutationDataQuery } from "api/api-service";

const StudyDetails = () => {
  const { geneName, pmid } = useParams();
  const [disease, gene] = geneName.split("-");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedMutationData, setSelectedMutationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    studyDetailsQuery(disease, gene, pmid)
  );

  const handleMutationClick = async (mutationName, genotype) => {
    setIsModalOpen(true);
    const maxRetries = 3;
    const retryDelay = 500;

    const fetchWithRetry = async (attempt = 0) => {
    try {
      const result = await queryClient.fetchQuery({
        ...mutationDataQuery(disease, gene, pmid, mutationName),
      });
      console.log({ disease, gene, pmid, mutationName, result });

      setSelectedMutationData({
        data: result,
        originalMutation: mutationName,
      });
    } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt < maxRetries) {
          setTimeout(() => fetchWithRetry(attempt + 1), retryDelay);
        } else {
          setSelectedMutationData({ error: "Failed to fetch mutation data after 3 attempts" });
        }
    }
  };

    fetchWithRetry();
  };


  if (isLoading)
    return (
      <Flex w="full" h="100vh" justify="center" align="center">
        <CustomSpinner type="Circles" color="#ac202d" size={200} />
      </Flex>
    );
  if (error) return <Text>An error occurred: {error.message}</Text>;

  const renderSymptoms = (symptoms) => {
    return symptoms.map((symptom, index) => (
      <Badge key={index} mr={1} mb={1}>
        {symptom.replace(/_/g, " ")}
      </Badge>
    ));
  };

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/genes/${geneName}`)}
        mb={4}
        variant="outline"
      >
        Back to Gene Overview
      </Button>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl">
          Study Details for {geneName} (PMID: {pmid})
        </Heading>

        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Index Patient</Th>
              <Th>Sex</Th>
              <Th>Country</Th>
              <Th>AAO</Th>
              <Th>AAE</Th>
              <Th>Family History</Th>
              <Th>Symptoms</Th>
              <Th>Mutations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((patient, index) => (
              <Tr key={index}>
                <Td>{patient.index_patient}</Td>
                <Td>{patient.sex !== "n.a." ? patient.sex : "N/A"}</Td>
                <Td>
                  {patient.country_of_origin !== "n.a."
                    ? countries[patient.country_of_origin]
                    : "N/A"}
                </Td>
                <Td>{patient.aao !== "n.a." ? patient.aao : "N/A"}</Td>
                <Td>{patient.aae !== "n.a." ? patient.aae : "N/A"}</Td>
                <Td>{patient.family_history}</Td>
                <Td>{renderSymptoms(patient.symptoms)}</Td>
                <Td>
                  <CollapsibleMutations
                    mutations={patient.reported_mutations.map((mutation) => ({
                      type: "single",
                      name: mutation.name,
                      genotype: mutation.genotype,
                    }))}
                    onMutationClick={handleMutationClick}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent maxW="1000px">
          <ModalHeader fontSize="xl" fontWeight="bold" color="red.600" mb={4}>
            Mutation Data
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMutationData ? (
              selectedMutationData.error ? (
                <Text color="red.500">{selectedMutationData.error}</Text>
              ) : (
                <MutationDataDisplay data={selectedMutationData.data} />
              )
            ) : (
              <CustomSpinner type="MG" color="#ac202d" size={200} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudyDetails;
