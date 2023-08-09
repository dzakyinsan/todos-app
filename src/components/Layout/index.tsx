import { object } from "prop-types";
import { renderRoutes } from "react-router-config";
import { Layout as BaseLayout, Col, Row } from "antd";

import Sidebar from "../Sidebar";
import Header from "../Header";
import './style.scss'

const Layout = ({ route }: any) => {
  return (
    <>
      <Header />
      <Row justify={"center"}>
        <Col span={24} xxl={16}>
          <BaseLayout hasSider className="main-layout">
            <Sidebar />
            <BaseLayout className="layout">
              <BaseLayout.Content className="content">
                {renderRoutes(route.routes)}
              </BaseLayout.Content>
            </BaseLayout>
          </BaseLayout>
        </Col>
      </Row>
    </>
  );
};

Layout.propTypes = {
  route: object,
};

export default Layout;
