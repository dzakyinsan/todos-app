import { useState, ReactNode, Key } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

import PokemonLogo from "./../../assets/pokemon-logo.png";
import PokeballLogo from "./../../assets/pokeball-logo.png";
import { sidebarMenu } from "./menu";

import "./style.scss";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return { key, icon, children, label } as MenuItem;
  }

  const items: MenuItem[] = sidebarMenu.map((val, i) =>
    getItem(<Link to={val.to}>{val.title}</Link>, i, val.icon)
  );

  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="pokemon-logo">
        <Link to="/">
          <img
            src={collapsed ? PokeballLogo : PokemonLogo}
            className={collapsed ? "pokeball-img" : "pokemon-img"}
            alt="logo"
          />
        </Link>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["0"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
