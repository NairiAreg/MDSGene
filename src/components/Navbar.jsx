import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

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
    <Tabs
      index={currentTabIndex !== -1 ? currentTabIndex : 0}
      onChange={handleTabChange}
    >
      <TabList>
        {panels.map((panel, index) => (
          <Tab key={index}>{panel.title}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
