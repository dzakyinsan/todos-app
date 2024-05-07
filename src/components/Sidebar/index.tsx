import { useState, ReactNode, Key } from "react";
import { Button, Layout, Menu, MenuProps } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";

import DeckIcon from "./../../assets/deck-icon.webp";
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

  const items: MenuItem[] = sidebarMenu.map((val, i) => getItem(<Link to={val.to}>{val.title}</Link>, val.to, val.icon));

  const selectedKey: any = sidebarMenu.find((val) => val.to === pathname) || {};

  function onSelectBottomTab(to: string) {
    push(to);
  }

  const renderLogo = () => (
    <div className="pokemon-logo">
      <Link to="/">
        <div style={{ color: 'white', fontStyle: 'italic' }}>
          <div style={{ position: 'absolute', top: '-15px', left: '-50px' }}><img src={DeckIcon} alt='icon' height='60px' /></div>
          {!collapsed &&
            <>
              <div>POKEMON</div>
              <div><b>WORLD DECK</b></div>
            </>
          }
        </div>
      </Link>
    </div>
  );

  return (
    <>
      <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="sidebar-test">
        {renderLogo()}
        <Menu theme="dark" defaultSelectedKeys={[pathname]} selectedKeys={[selectedKey.to]} mode="inline" items={items} />
      </Sider>
      <div className="ant-navbar-bottom">
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
