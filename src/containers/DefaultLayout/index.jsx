import React from "react";
import { Container } from "@chakra-ui/react";
import Navbar from "components/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <Container maxW="1200px" p={5}>
      <Navbar />
      {children}
    </Container>
  );
};

export default DefaultLayout;
