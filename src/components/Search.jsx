import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Search as SearchIcon, X } from "lucide-react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    inputRef.current.focus();
  };

  return (
    <Box
      width="100%"
      maxWidth="400px"
      transition="all 0.3s"
      transform={isFocused ? "translateY(-2px)" : "none"}
    >
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon size={20} color={isFocused ? "#3182CE" : "#718096"} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search studies..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          borderRadius="full"
          bg="white"
          borderColor={isFocused ? "blue.400" : "gray.300"}
          borderWidth="2px"
          _hover={{ borderColor: "blue.300" }}
          _focus={{
            boxShadow: "0 0 0 1px #3182CE",
            borderColor: "blue.400",
          }}
          pl="2.5rem"
          pr="2.5rem"
        />
        {searchTerm && (
          <InputRightElement>
            <IconButton
              icon={<X size={20} />}
              size="sm"
              variant="ghost"
              onClick={handleClear}
              aria-label="Clear search"
              color="gray.500"
              _hover={{ color: "blue.500" }}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {isFocused && (
        <Text fontSize="xs" color="gray.500" mt={1} ml={4}>
          Search by Study, Study design, mutations or PMID
        </Text>
      )}
    </Box>
  );
};

export default Search;
