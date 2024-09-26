import React from "react";
import { Box, Heading, Button, SimpleGrid } from "@chakra-ui/react";

const DiseaseSection = ({ title, genes }) => (
  <Box bg="gray.100" p={4} borderRadius="md">
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
    <SimpleGrid columns={[2, 3, 4]} spacing={2}>
      {genes.map((gene, index) => (
        <Button key={index} size="sm" variant="outline">
          {gene}
        </Button>
      ))}
    </SimpleGrid>
  </Box>
);

export default DiseaseSection;
