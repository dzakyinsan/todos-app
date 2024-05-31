import { BarsOutlined } from "@ant-design/icons";

type TSidebarMenu = {
  title: string;
  to: string;
  icon: any;
};

export const sidebarMenu: TSidebarMenu[] = [
  {
    title: "Dashbaord",
    to: "/",
    icon: <BarsOutlined rev={""} />,
  },
  {
    title: "Todo",
    to: "/todo",
    icon: <BarsOutlined rev={""} />,
  },
];
