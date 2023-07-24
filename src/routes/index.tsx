import { RouteConfig } from "react-router-config";
import Layout from "../components/Layout";

import Home from "./Home";
import PokemonList from "./PokemonList";

export interface MainRouteConfig extends Omit<RouteConfig, "routes"> {
  meta?: any;
  routes?: MainRouteConfig[] | undefined;
}

const titleTemplate = "Test";

const routes = () => {
  console.log("routes");

  return [
    {
      component: Layout,
      routes: [
        {
          path: "/",
          exact: true,
          component: Home,
        },
        {
          path: "/pokemon-list",
          exact: true,
          component: PokemonList,
        },
      ] as MainRouteConfig[],
    },
  ];
};

export default routes;
