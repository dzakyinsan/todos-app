import { RouteConfig } from "react-router-config";
import Layout from "../components/Layout";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";

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
          path: "/pokemons",
          exact: true,
          component: PokemonList,
        },
        {
          path: "/pokemons/:id",
          exact: true,
          component: PokemonDetail,
        },
      ] as MainRouteConfig[],
    },
  ];
};

export default routes;
