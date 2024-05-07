import { BarsOutlined, BugOutlined } from "@ant-design/icons";

export const sidebarMenu = [
  {
    title: "Pokemons",
    to: "/pokemons",
    icon: <BarsOutlined rev={''} />,
  },
  {
    title: "My Pokemons",
    to: "/my-pokemons",
    icon: <BugOutlined rev={''} />,
  },
];
