import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Image,
  Flex,
  Container,
} from "@chakra-ui/react";
import SignsAndSymptoms from "./SignsAndSymptoms";
import Genes from "./Genes";
// import Methods from "./Methods.jsx";
// import Disclaimer from "./Disclaimer.jsx";
// import AboutUs from "./AboutUs.jsx";
// import Publications from "./Publications.jsx";
import ContactUs from "./ContactUs.jsx";

const MDSGeneDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container maxW="1200px" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Image src="/logo1.png" alt="MDSGene Logo" h="full" />
        <Image src="/logo2.png" alt="IPMDS Logo" h="full" />
      </Flex>
      <Tabs index={tabIndex} onChange={setTabIndex} mx="44px">
        <TabList>
          <Tab>SIGNS AND SYMPTOMS</Tab>
          <Tab>GENES</Tab>
          <Tab>METHODS</Tab>
          <Tab>DISCLAIMER</Tab>
          <Tab>ABOUT US</Tab>
          <Tab>PUBLICATIONS</Tab>
          <Tab>CONTACT US</Tab>
        </TabList>
        <TabPanels>
          <TabPanel mx="44px">
            <SignsAndSymptoms />
          </TabPanel>
          <TabPanel mx="44px">
            <Genes />
          </TabPanel>
          <TabPanel mx="44px">
            <ContactUs />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MDSGeneDashboard;
