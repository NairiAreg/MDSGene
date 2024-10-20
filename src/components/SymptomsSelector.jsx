import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Checkbox,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getSymptomCategories, sendSymptoms } from "api/api-service";

const SymptomsSelector = () => {
  const [age, setAge] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const toast = useToast();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["symptomCategories"],
    queryFn: getSymptomCategories,
  });

  useEffect(() => {
    if (categories) {
      const initialSelectedSymptoms = Object.values(categories)
        .flat()
        .reduce((acc, symptom) => {
          acc[symptom] = false;
          return acc;
        }, {});
      setSelectedSymptoms(initialSelectedSymptoms);
    }
  }, [categories]);

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptom]: !prev[symptom],
    }));
  };

  const handleReset = () => {
    setAge("");
    setSelectedSymptoms((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
  };

  const handleSubmit = async () => {
    try {
      const selectedSymptomsList = Object.entries(selectedSymptoms)
        .filter(([_, isSelected]) => isSelected)
        .map(([symptom]) => symptom);

      await sendSymptoms({ age, symptoms: selectedSymptomsList });
      toast({
        title: "Symptoms submitted",
        description: "Your symptoms have been sent for analysis.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description:
          "There was an error submitting your symptoms. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) return <Text>Loading symptoms...</Text>;
  if (error) return <Text>Error loading symptoms: {error.message}</Text>;

  return (
    <Box margin="auto" p={4}>
      <Heading as="h2" size="xl" color="red.600" mb={6}>
        Select signs and symptoms present in your patient:
      </Heading>

      <Box mb={6}>
        <Text mb={2}>Age at onset</Text>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
          width="200px"
        />
        <Text display="inline-block" ml={2}>
          years
        </Text>
      </Box>

      <VStack spacing={6} align="stretch">
        {Object.entries(categories).map(([category, symptoms]) => (
          <Box key={category} borderWidth={1} borderRadius="md" p={4}>
            <Heading as="h3" size="md" mb={3}>
              {category}
            </Heading>
            <SimpleGrid columns={3} spacing={4}>
              {symptoms.map((symptom) => (
                <Checkbox
                  key={symptom}
                  isChecked={selectedSymptoms[symptom]}
                  onChange={() => handleSymptomToggle(symptom)}
                >
                  {symptom.split("_").slice(0, -1).join(" ")}
                </Checkbox>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>

      <Box mt={8} display="flex" justifyContent="space-between">
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleSubmit}
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          Click here to see possible diagnoses
        </Button>
        <Button
          colorScheme="gray"
          size="lg"
          onClick={handleReset}
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          Reset the fields
        </Button>
      </Box>
    </Box>
  );
};

export default SymptomsSelector;
