import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const CollapsibleMutations = ({ mutations }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedMutations = isExpanded ? mutations : mutations.slice(0, 3);

  return (
    <Box>
      {displayedMutations.map((mutation, index) => (
        <Text key={index}>{mutation}</Text>
      ))}
      {mutations.length > 3 && (
        <Button
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          leftIcon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          mt={1}
        >
          {isExpanded ? "Show less" : `Show ${mutations.length - 3} more`}
        </Button>
      )}
    </Box>
  );
};

export default CollapsibleMutations;
