import { RouteConfig } from "react-router-config";
import MyPokemons from "./MyPokemons";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";
import Layout from "../components/Layout";

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
        {
          path: "/my-pokemons",
          exact: true,
          component: MyPokemons,
        },
      ] as MainRouteConfig[],
    },
  ];
};

export default routes;
