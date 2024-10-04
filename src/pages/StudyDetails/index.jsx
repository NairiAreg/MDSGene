import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
  Spinner,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { countries } from "utils/utils";

const studyDetailsQuery = (disease, gene, pmid) => ({
  queryKey: ["studyDetails", disease, gene, pmid],
  queryFn: async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/patients_for_publication?disease_abbrev=${disease}&gene=${gene}&pmid=${pmid}`
    );
    return response.data;
  },
});

const StudyDetails = () => {
  const { geneName, pmid } = useParams();
  const [disease, gene] = geneName.split("-");
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(
    studyDetailsQuery(disease, gene, pmid)
  );

  if (isLoading)
    return (
      <Flex w="full" h="100vh" justify="center" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  if (error) return <Text>An error occurred: {error.message}</Text>;

  const renderSymptoms = (symptoms) => {
    return Object.entries(symptoms)
      .filter(([, value]) => value !== -99 && value !== "no")
      .map(([key, value]) => (
        <Text key={key}>
          {key.replace(/_/g, " ").replace("sympt", "")}: {value}
        </Text>
      ));
  };

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/gene/${geneName}`)}
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
              <Th>Symptoms</Th>
              <Th>Mutations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((patient, index) => (
              <Tr key={index}>
                <Td>{patient.index_patient}</Td>
                <Td>{patient.sex}</Td>
                <Td>
                  {patient.country_of_origin !== -99
                    ? countries[patient.country_of_origin]
                    : "N/A"}
                </Td>
                <Td>{patient.aao !== -99 ? patient.aao : "N/A"}</Td>
                <Td>{patient.aae !== -99 ? patient.aae : "N/A"}</Td>
                <Td>{renderSymptoms(patient.symptoms)}</Td>
                <Td>
                  {Object.entries(patient.reported_mutations)
                    .filter(
                      ([key, value]) =>
                        value !== -99 && !key.includes("genotype")
                    )
                    .map(([key, value]) => (
                      <Text key={key}>
                        {value} (
                        {
                          patient.reported_mutations[
                            `${key.split("_")[0]}_genotype`
                          ]
                        }
                        )
                      </Text>
                    ))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default StudyDetails;
