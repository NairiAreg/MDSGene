import DefaultLayout from "../containers/DefaultLayout";
import SignsAndSymptoms from "./Dashboard/SignsAndSymptoms";
import Genes from "./Dashboard/Genes";
import Methods from "./Dashboard/Methods";
import Disclaimer from "./Dashboard/Disclaimer";
import AboutUs from "./Dashboard/AboutUs";
import Publications from "./Dashboard/Publications";
import ContactUs from "./Dashboard/ContactUs";
import Gene from "./Gene";
import Charts from "./Charts";
import StudyDetails from "./StudyDetails";
import WorldMap from "./WorldMap";
import SymptomsAnalysis from "./SymptomsAnalysis";

const routes = [
  {
    path: "/",
    Component: SignsAndSymptoms,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/signs-and-symptoms",
    Component: SignsAndSymptoms,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/genes",
    Component: Genes,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/methods",
    Component: Methods,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/disclaimer",
    Component: Disclaimer,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/about-us",
    Component: AboutUs,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/publications",
    Component: Publications,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/contact-us",
    Component: ContactUs,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/genes/:geneName",
    Component: Gene,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/genes/charts/:geneName",
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
    path: "/genes/:geneName/:pmid",
    Component: StudyDetails,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
  {
    path: "/symptoms-analysis",
    Component: SymptomsAnalysis,
    Layout: DefaultLayout,
    secured: false,
    exact: true,
  },
];

export default routes;
