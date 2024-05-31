import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

import AuthContext from "../../context/authContext";
import Header from "../Header";
import { sidebarMenu } from "./menu";
import "./style.scss";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = sidebarMenu.map((val) =>
  getItem(<Link to={val.to}>{val.title}</Link>, val.to, val.icon)
);

const Layouts = ({ route }: any) => {
  const location = useLocation();

  const { state, dispatch } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch({ type: "INITIALIZE", payload: user });
    }
  }, []);

  if (location.pathname === "/login") {
    return renderRoutes(route.routes);
  }

  return (
    <Layout className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          {renderRoutes(route.routes)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
