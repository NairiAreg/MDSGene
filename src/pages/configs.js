import DefaultLayout from "../containers/DefaultLayout";
import Home from "./Dashboard";
import Gene from "./Gene";

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
];

export default routes;
