import { RouteConfig } from "react-router-config";
import Layout from "../components/Layout";
import PokemonList from "./PokemonList";

export interface MainRouteConfig extends Omit<RouteConfig, "routes"> {
  meta?: any;
  routes?: MainRouteConfig[] | undefined;
}

const routes = () => {
  return [
    {
      component: Layout,
      routes: [
        {
          path: "/",
          exact: true,
          component: PokemonList,
        },
      ] as MainRouteConfig[],
    },
  ];
};

export default routes;
