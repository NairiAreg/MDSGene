import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Flex,
  Container,
} from "@chakra-ui/react";
import SignsAndSymptoms from "./SignsAndSymptoms";
import Genes from "./Genes";
import Methods from "./Methods";
import Disclaimer from "./Disclaimer.jsx";
import AboutUs from "./AboutUs.jsx";
import Publications from "./Publications.jsx";
import ContactUs from "./ContactUs.jsx";

const panels = [
  { title: "SIGNS AND SYMPTOMS", component: SignsAndSymptoms },
  { title: "GENES", component: Genes },
  { title: "METHODS", component: Methods },
  { title: "DISCLAIMER", component: Disclaimer },
  { title: "ABOUT US", component: AboutUs },
  { title: "PUBLICATIONS", component: Publications },
  { title: "CONTACT US", component: ContactUs },
];

const MDSGeneDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      const index = panels.findIndex(
        (panel) => panel.title.toLowerCase() === tab.toLowerCase()
      );
      if (index !== -1) {
        setTabIndex(index);
      }
    }
  }, [location]);

  return (
    <Container maxW="1200px" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Image src="/logo1.png" alt="MDSGene Logo" h="full" />
        <Image src="/logo2.png" alt="IPMDS Logo" h="full" />
      </Flex>
      <Tabs index={tabIndex} onChange={setTabIndex} mx="44px">
        <TabList>
          {panels.map((panel, index) => (
            <Tab key={index}>{panel.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {panels.map((panel, index) => (
            <TabPanel key={index} mx="44px">
              <panel.component />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MDSGeneDashboard;
