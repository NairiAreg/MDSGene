import React, {useState, useEffect, useMemo} from "react";
import {useNavigate} from "react-router-dom";
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
import {useQuery} from "@tanstack/react-query";
import {getSymptomCategories, sendSymptoms} from "api/api-service";

const SymptomsSelector = () => {
  const [age, setAge] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [initialSymptoms, setInitialSymptoms] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const {data: categories, isLoading, error} = useQuery({
    queryKey: ["symptomCategories"],
    queryFn: getSymptomCategories,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (categories && !initialSymptoms) {
      const symptoms = Object.values(categories)
          .flat()
          .reduce((acc, symptom) => {
            acc[symptom] = false;
            return acc;
          }, {});
      setSelectedSymptoms(symptoms);
      setInitialSymptoms(symptoms);
    }
  }, [categories, initialSymptoms]);

  const hasSelectedSymptoms = useMemo(() => {
    return Object.values(selectedSymptoms).some((isSelected) => isSelected);
  }, [selectedSymptoms]);

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptom]: !prev[symptom],
    }));
  };

  const handleReset = () => {
    setAge("");
    setSelectedSymptoms(initialSymptoms);
  };

  const handleSubmit = async () => {
    try {
      const selectedSymptomsList = Object.entries(selectedSymptoms)
          .filter(([_, isSelected]) => isSelected)
          .map(([symptom]) => symptom);

      const response = await sendSymptoms({age, symptoms: selectedSymptomsList});

      navigate("/symptoms-analysis", {
        state: {symptoms: selectedSymptomsList, response},
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
                        {symptom}
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
              _hover={{boxShadow: "lg"}}
              isDisabled={!hasSelectedSymptoms}
          >
            Click here to see possible diagnoses
          </Button>
          <Button
              colorScheme="gray"
              size="lg"
              onClick={handleReset}
              boxShadow="md"
              _hover={{boxShadow: "lg"}}
          >
            Reset the fields
          </Button>
        </Box>
      </Box>
  );
};

export default SymptomsSelector;
