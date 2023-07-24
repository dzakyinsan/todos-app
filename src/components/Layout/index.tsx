import React, { useEffect } from "react";
import { object } from "prop-types";
import { renderRoutes } from "react-router-config";
import { Layout as BaseLayout } from "antd";
import Sidebar from "../Sidebar";

const Layout = ({ route }: any) => {
  return (
    <BaseLayout hasSider className="main-layout">
      <Sidebar />
      <BaseLayout className="layout">
        {/* <Header /> */}
        <BaseLayout.Content className="content">
          {renderRoutes(route.routes)}
        </BaseLayout.Content>
      </BaseLayout>
    </BaseLayout>
  );
};

Layout.propTypes = {
  route: object,
};

export default Layout;
