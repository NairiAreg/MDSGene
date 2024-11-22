import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons"; // Добавляем импорт
import {
  Box,
  Input,
  List,
  ListItem,
  Tag,
  TagCloseButton,
  TagLabel,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"; // Добавляем InputGroup и InputRightElement
import { searchCountriesByAbbr } from "utils/utils";

const MultiSelectDropdown = ({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const flattenMutations = (mutations) => {
    return mutations
      .map((mutation) => {
        if (typeof mutation === "string") {
          return mutation;
        } else if (mutation.type === "single") {
          return mutation.name;
        } else if (mutation.type === "compound_het") {
          return mutation.mutations.map((m) => m.name);
        }
        return [];
      })
      .flat();
  };

  const flattenedOptions = flattenMutations(options);

  const filteredOptions = flattenedOptions?.filter((option) => {
    if (option === null || option === undefined) return false;
    const optionString = String(option).toLowerCase();
    const inputLower = inputValue.toLowerCase();
    return (
      !selectedItems?.includes(option) &&
      (optionString.includes(inputLower) ||
        searchCountriesByAbbr(inputValue).includes(optionString))
    );
  });

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue("");
    inputRef.current.focus();
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    inputRef.current.focus();
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <Box width="100%" position="relative">
      <Text mb={0}>{label}</Text>
      <Box ref={dropdownRef}>
        <Flex flexWrap="wrap" mb={2}>
          {selectedItems.map((item) => (
            <Tag
              key={item}
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
              mr={2}
              mb={2}
            >
              <TagLabel>{item}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveItem(item)} />
            </Tag>
          ))}
        </Flex>
        <InputGroup>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
          <InputRightElement
              right="0.35rem"
              cursor="pointer" // Добавляем курсор-pointer чтобы показать что элемент кликабельный
              onClick={() => setIsOpen(!isOpen)} // Добавляем обработчик клика
          >
            <ChevronDownIcon />
          </InputRightElement>
        </InputGroup>
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
            {filteredOptions.map((option, index) => (
              <ListItem
                key={index}
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                onClick={() => handleItemClick(option)}
                bg={selectedItems.includes(option) ? "gray.100" : "white"}
              >
                {String(option)}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default MultiSelectDropdown;
