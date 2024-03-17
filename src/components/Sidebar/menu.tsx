import { BarsOutlined, BugOutlined } from "@ant-design/icons";

export const sidebarMenu = [
  {
    title: "Pokemons",
    to: "/pokemons",
    icon: <BarsOutlined rev={null}/>,
  },
  {
    title: "My Pokemons",
    to: "/my-pokemon",
    icon: <BugOutlined rev={null}/>,
  },
];
