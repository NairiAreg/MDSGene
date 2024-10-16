import React, { useState } from "react";
import { Button, Flex, Text, VStack } from "@chakra-ui/react";

const CollapsibleMutations = ({ mutations, onMutationClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedMutations = isExpanded ? mutations : mutations.slice(0, 3);

  const renderMutation = (mutation, index, isCompoundHet = false) => {
    const handleClick = () => {
      onMutationClick(mutation.name, mutation.genotype);
    };

    return (
      <Text key={`${mutation.name}_${index}`} w="max-content">
        <Text
          as="span"
          cursor="pointer"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
          onClick={handleClick}
        >
          {mutation.name}
        </Text>
        {!isCompoundHet && `: ${mutation.genotype}`}
      </Text>
    );
  };

  const renderMutationGroup = (mutationGroup, groupIndex) => {
    if (mutationGroup.type === "single") {
      return renderMutation(mutationGroup, groupIndex);
    } else if (mutationGroup.type === "compound_het") {
      return (
        <VStack
          key={`compound_het_${groupIndex}`}
          align="flex-start"
          spacing={0}
        >
          {renderMutation(mutationGroup.mutations[0], `${groupIndex}-0`, true)}
          <Flex align="center">
            <Text mr={1}>+</Text>
            {renderMutation(
              mutationGroup.mutations[1],
              `${groupIndex}-1`,
              true
            )}
            <Text ml={1}>: comp. het.</Text>
          </Flex>
        </VStack>
      );
    }
    return null;
  };

  return (
    <Flex direction="column" align="flex-start">
      {displayedMutations.map((mutationGroup, index) =>
        renderMutationGroup(mutationGroup, index)
      )}
      {mutations.length > 3 && (
        <Button size="xs" onClick={() => setIsExpanded(!isExpanded)} mt={2}>
          {isExpanded ? "Show Less" : `+${mutations.length - 3} More`}
        </Button>
      )}
    </Flex>
  );
};

export default CollapsibleMutations;
