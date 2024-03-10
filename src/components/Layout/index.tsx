import { useEffect } from 'react';
import { object } from "prop-types";
import { renderRoutes } from "react-router-config";
import { Layout as BaseLayout, Col, Row } from "antd";
import { useHistory } from "react-router-dom";


import Sidebar from "../Sidebar";
import Header from "../Header";
import './style.scss'

const Layout = ({ route }: any) => {
  const history = useHistory();

  useEffect(() => {
    history.push('/pokemon-list')
  },[])
  
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
