import { Box, Heading, Text } from "@chakra-ui/react";

export default function TextBlock({ title, children }) {
  return (
    <Box>
      {title && (
        <Heading as="h3" size="md" color="red.700" mb={2}>
          {title}
        </Heading>
      )}
      <Text fontSize="sm">{children}</Text>
    </Box>
  );
}
