import { Col, Row } from "antd";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/authContext";
import BlueDot from "./../../assets/blue-dot.svg";
import LoginImage from "./../../assets/login-image.svg";
import RedDot from "./../../assets/red-dot.svg";
import FormData from "./form";

import "./style.scss";

function Login() {
  const { state } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push("/todo");
    }
  }, [state.isAuthenticated]);

  return (
    <section id="login">
      <div className="container">
        <Row className="container-row">
          <Col xs={0} lg={12}>
            <div className="left">
              <div className="image-wraper">
                <img
                  src={LoginImage}
                  alt="login-images"
                  className="left-image"
                />
                <img src={RedDot} alt="red-dot" className="red-dot" />
                <img src={BlueDot} alt="red-dot" className="blue-dot" />
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="right">
              <FormData />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Login;
