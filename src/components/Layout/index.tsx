import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Layout as BaseLayout, Col, Row } from "antd";
import { object } from "prop-types";

import Sidebar from "../Sidebar";
import Header from "../Header";
import MainContext from "../../context/mainContext";
import "./style.scss";

const Layout = ({ route }: any) => {
  const history = useHistory();
  const location = useLocation();
  const { dispatch } = useContext(MainContext);

  useEffect(() => {
    if (localStorage.getItem("myPokemons")) {
      dispatch({ type: "add" });
    } else {
      localStorage.setItem("myPokemons", JSON.stringify([]));
    }

    location.pathname === "/" && history.push("/pokemons");
  }, []);

  return (
    <>
      <Header />
      <Row justify={"center"} className="main-content">
        <Col span={24} xxl={16}>
          <BaseLayout hasSider className="main-layout">
            <Sidebar />
            <BaseLayout className="layout">
              <BaseLayout.Content className="content">{renderRoutes(route.routes)}</BaseLayout.Content>
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
