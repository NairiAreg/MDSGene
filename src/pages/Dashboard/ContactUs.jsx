import React from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Box maxWidth="600px" margin="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl>
            <FormLabel>Institution</FormLabel>
            <Input placeholder="Enter your institution" />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Enter your address" />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input placeholder="Enter your country" />
          </FormControl>
          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Input placeholder="Enter the subject" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Enter your message" />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Send the message
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ContactUs;
