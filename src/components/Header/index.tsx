import {
  CalendarOutlined,
  LoginOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Row,
} from "antd";
import { useContext } from "react";
import { logoutAction } from "../../actions/authActions";
import AuthContext from "../../context/authContext";
import "./style.scss";

export default function Header() {
  const {
    state: { email },
    dispatch,
  } = useContext(AuthContext);

  const items: MenuProps["items"] = [
    {
      label: (
        <Flex gap={"small"}>
          <LoginOutlined />
          Log Out
        </Flex>
      ),
      key: "0",
      onClick: () => logoutAction(dispatch),
    },
  ];

  return (
    <div className="header-class">
      <Row align={"middle"}>
        <Col sm={12} lg={17}>
          <Flex vertical={false} gap={"middle"}>
            <Input placeholder="Search" prefix={<SearchOutlined />} />
            <CalendarOutlined style={{ fontSize: "20px", color: "#4F4F4F" }} />
          </Flex>
        </Col>
        <Col sm={12} lg={7}>
          <Flex vertical={false} gap={"middle"} justify="end" align="center">
            <Flex vertical align="flex-end" className="profile">
              <p>{email}</p>
              <span>admin</span>
            </Flex>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Badge dot>
                  <Avatar icon={<UserOutlined />} />
                </Badge>
              </a>
            </Dropdown>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
