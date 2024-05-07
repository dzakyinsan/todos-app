import { RouteConfig } from "react-router-config";
import Layout from "../components/Layout";
import MyPokemons from "./MyPokemons";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";
import Home from "./Home";

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
          component: Home,
        },
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
