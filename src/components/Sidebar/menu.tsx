import { BarsOutlined, BugOutlined } from "@ant-design/icons";

export const sidebarMenu = [
  {
    title: "Pokemons",
    to: "/pokemon-list",
    icon: <BarsOutlined rev={null}/>,
  },
  {
    title: "My Pokemons",
    to: "/my-pokemon",
    icon: <BugOutlined rev={null}/>,
  },
];
