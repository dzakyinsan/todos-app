import { useState, ReactNode, Key } from "react";
import { Button, Layout, Menu, MenuProps } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";

import PokemonLogo from "./../../assets/pokemon-logo.png";
import PokeballLogo from "./../../assets/pokeball-logo.png";
import { sidebarMenu } from "./menu";

import "./style.scss";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { pathname } = useLocation();
  const { push } = useHistory();

  function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
  }

  const items: MenuItem[] = sidebarMenu.map((val, i) => getItem(<Link to={val.to}>{val.title}</Link>, i, val.icon));

  function onSelectBottomTab(to: string) {
    push(to);
  }

  const renderLogo = () => (
    <div className="pokemon-logo">
      <Link to="/">
        <img src={collapsed ? PokeballLogo : PokemonLogo} className={collapsed ? "pokeball-img" : "pokemon-img"} alt="logo" />
      </Link>
    </div>
  );

  return (
    <>
      <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="sidebar-test">
        {renderLogo()}
        <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline" items={items} />
      </Sider>
      <div className="ant-navbar-bottom">
        {renderLogo()}
        {sidebarMenu?.map((val) => (
          <div key={val.title} className="w-100" style={{ padding: "10px" }}>
            <Button type={pathname.includes(val.to) ? "primary" : "text"} className="w-100 h-100" onClick={() => onSelectBottomTab(val.to)}>
              {val.icon}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
