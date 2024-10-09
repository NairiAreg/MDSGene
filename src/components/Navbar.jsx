import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabList, Tab, Flex, Image } from "@chakra-ui/react";

const panels = [
  { title: "SIGNS AND SYMPTOMS", path: "/signs-and-symptoms" },
  { title: "GENES", path: "/genes" },
  { title: "METHODS", path: "/methods" },
  { title: "DISCLAIMER", path: "/disclaimer" },
  { title: "ABOUT US", path: "/about-us" },
  { title: "PUBLICATIONS", path: "/publications" },
  { title: "CONTACT US", path: "/contact-us" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (index) => {
    navigate(panels[index].path);
  };

  const currentTabIndex = panels.findIndex((panel) =>
    location.pathname.startsWith(panel.path)
  );

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Image src="/logo1.png" alt="MDSGene Logo" h="full" />
        <Image src="/logo2.png" alt="IPMDS Logo" h="full" />
      </Flex>
      <Tabs
        index={currentTabIndex !== -1 ? currentTabIndex : 0}
        onChange={handleTabChange}
        mb={8}
      >
        <TabList>
          {panels.map((panel, index) => (
            <Tab key={index} as="a" href={panel.path}>
              {panel.title}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </>
  );
};

export default Navbar;
