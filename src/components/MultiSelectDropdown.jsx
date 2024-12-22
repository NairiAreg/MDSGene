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

// Helper function to extract position number from variant string
const getVariantPosition = (variant) => {
  const match = variant.match(/\d+/);
  return match ? parseInt(match[0]) : Infinity;
};

// Define categorical variants and their order
const categoryOrder = {
  "pathogenic": 1,
  "likely pathogenic": 2,
  "vus": 3,
  "risk variant": 4
};

// Updated helper function to determine if a string is a categorical variant
const isCategoricalVariant = (variant) => {
  return Object.keys(categoryOrder).some(category =>
    variant.toLowerCase().includes(category.toLowerCase())
  );
};

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
    const seen = new Set();
    const flattened = mutations
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
      .flat()
      .filter(item => {
        // Remove duplicates
        if (item && !seen.has(item)) {
          seen.add(item);
          return true;
        }
        return false;
      });

    // Separate categorical and specific variants
    const categorical = flattened.filter(item => isCategoricalVariant(item));
    const specific = flattened.filter(item => !isCategoricalVariant(item));

    // Sort categorical variants by predefined order
    const sortedCategorical = categorical.sort((a, b) => {
      const getCategoryOrder = (variant) => {
        const category = Object.keys(categoryOrder).find(cat =>
          variant.toLowerCase().includes(cat.toLowerCase())
        );
        return category ? categoryOrder[category] : Infinity;
      };

      return getCategoryOrder(a) - getCategoryOrder(b);
    });

    // Sort specific variants by position
    const sortedSpecific = specific.sort((a, b) => {
      const posA = getVariantPosition(a);
      const posB = getVariantPosition(b);
      if (posA === posB) {
        // If positions are the same, sort alphabetically
        return a.localeCompare(b);
      }
      return posA - posB;
    });

    // Combine sorted arrays with categorical variants first
    return [...sortedCategorical, ...sortedSpecific];
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
