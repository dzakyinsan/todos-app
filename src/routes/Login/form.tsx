import { GoogleLogin } from "@react-oauth/google";
import { Button, Form, Input, message } from "antd";
import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";

import { googleLoginAction, loginAction } from "../../actions/authActions";
import AuthContext from "../../context/authContext";
import { TUser } from "../../types/auth";
import Square1 from "./../../assets/square1.svg";
import Square2 from "./../../assets/square2.svg";

const FormData = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  function onSubmit(val: TUser) {
    setLoading(true);
    loginAction(dispatch, val)
      .then((val) => {
        message.success(val as string);
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  }

  function onFailed(val: any) {
    message.error(val);
  }

  function googleLogin(email: string) {
    googleLoginAction(dispatch, email).then((val) => {
      message.success(val as string);
    });
  }

  return (
    <>
      {contextHolder}
      <div className="form">
        <h2>Welcome back</h2>
        <Form
          form={form}
          name="form"
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          onFinishFailed={onFailed}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              className="login-btn"
              htmlType="submit"
              disabled={loading}
            >
              {" "}
              Sign In
            </Button>
            <div className="devider">
              <div className="line" />
              <div className="or">or</div>
              <div className="line" />
            </div>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const res: any = jwtDecode(credentialResponse.credential!);
                googleLogin(res.email);
              }}
              onError={() => {
                message.error("Login Failed");
              }}
            />
          </Form.Item>
        </Form>
        <img src={Square1} alt="square-1" className="square top" />
        <img src={Square2} alt="square-2" className="square bottom" />
      </div>
    </>
  );
};

export default FormData;
