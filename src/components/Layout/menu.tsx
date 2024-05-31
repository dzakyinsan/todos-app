import { FileTextOutlined, HomeOutlined } from "@ant-design/icons";

type TSidebarMenu = {
  title: string;
  to: string;
  icon: any;
};

export const sidebarMenu: TSidebarMenu[] = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeOutlined rev={""} />,
  },
  {
    title: "Todo",
    to: "/todo",
    icon: <FileTextOutlined rev={""} />,
  },
];
