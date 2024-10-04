import React, { useState, useRef, useEffect } from "react";
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
} from "@chakra-ui/react";

const MultiSelectDropdown = ({
  onChange,
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

  const filteredOptions = options?.filter(
    (option) =>
      !selectedItems?.includes(option) &&
      option?.toLowerCase()?.includes(inputValue?.toLowerCase())
  );

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
    onChange(item);
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
      <Text mb={2}>{label}</Text>
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
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
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
              >
                {option}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default MultiSelectDropdown;
