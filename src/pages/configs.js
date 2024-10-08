import DefaultLayout from "../containers/DefaultLayout";
import Home from "./Dashboard";
import Gene from "./Gene";
import Charts from "./Charts";
import StudyDetails from "./StudyDetails";
import WorldMap from "./WorldMap";

const routes = [
  {
    path: "/",
    Component: Home,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/gene/:geneName",
    Component: Gene,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/charts/:geneName",
    Component: Charts,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/map/:geneName",
    Component: WorldMap,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/gene/:geneName/:pmid",
    Component: StudyDetails,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
];

export default routes;
