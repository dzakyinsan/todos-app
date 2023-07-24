import { useState, ReactNode, Key } from "react";
import { Layout, Menu, MenuProps } from "antd";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label} as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Option 1", "1", null),
    getItem("Team", "sub2", null, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", null),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
