import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

const CollapsibleMutations = ({ mutations, onMutationClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(mutations);

  const mutationArray = Object.entries(mutations)
    .filter(
      ([key, value]) =>
        key.startsWith("mut") && value !== -99 && !key.includes("genotype")
    )
    .map(([key, value]) => ({ type: key, value }));

  const displayedMutations = isExpanded
    ? mutationArray
    : mutationArray.slice(0, 3);

  const handleClick = (mutation) => {
    const [, num] = mutation.type.match(/mut(\d+)_(.)/);
    const pMutation = mutations[`mut${num}_p`];
    onMutationClick(
      pMutation !== -99 ? pMutation : mutation.value,
      mutation.type
    );
  };

  return (
    <Flex direction="column">
      {displayedMutations.map((mutation, index) => (
        <Text
          key={index}
          as="span"
          cursor="pointer"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
          onClick={() => handleClick(mutation)}
        >
          {mutation.value}
          {index < displayedMutations.length - 1 && ", "}
        </Text>
      ))}
      {mutationArray.length > 3 && (
        <Button size="xs" onClick={() => setIsExpanded(!isExpanded)} mt={1}>
          {isExpanded ? "Show Less" : `+${mutationArray.length - 3} More`}
        </Button>
      )}
    </Flex>
  );
};

export default CollapsibleMutations;
