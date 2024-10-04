import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const SingleSelectDropdown = ({ options, placeholder, label, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("all included patients");
  const [ageValue, setAgeValue] = useState(50);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Trigger onChange with default selection
    onChange({ type: selectedItem, age: ageValue });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChange({ type: item, age: ageValue });
  };

  const handleAgeChange = (value) => {
    setAgeValue(value);
    if (
      selectedItem &&
      (selectedItem.includes("AAO <") || selectedItem.includes("AAO >="))
    ) {
      onChange({ type: selectedItem, age: value });
    }
  };

  const showAgeInput =
    selectedItem &&
    (selectedItem.includes("AAO <") || selectedItem.includes("AAO >="));

  return (
    <Box width="100%" position="relative" ref={dropdownRef}>
      <Text mb={2}>{label}</Text>
      <Flex>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          width={showAgeInput ? "70%" : "100%"}
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          borderWidth={1}
          borderColor="gray.200"
          _hover={{ bg: "gray.50" }}
          mr={showAgeInput ? 2 : 0}
        >
          {selectedItem || placeholder}
        </Button>
        {showAgeInput && (
          <NumberInput
            min={0}
            max={100}
            value={ageValue}
            onChange={(valueString) =>
              handleAgeChange(parseInt(valueString, 10))
            }
            size="md"
            width="30%"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </Flex>
      {isOpen && (
        <List
          position="absolute"
          width="100%"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          mt={1}
          maxH="200px"
          overflowY="auto"
          zIndex={1}
        >
          {options.map((option, index) => (
            <ListItem
              key={index}
              px={4}
              py={2}
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
              onClick={() => handleItemClick(option)}
              bg={selectedItem === option ? "gray.100" : "white"}
            >
              {option}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SingleSelectDropdown;
