import React from "react";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container maxW="1200px" p={5}>
      <Outlet />
    </Container>
  );
};

export default Dashboard;
