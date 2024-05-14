import { Layout } from "antd";

import { useContext } from "react";
import MainContext from "../../context/mainContext";
import "./style.scss";

export default function Header() {
  const { state } = useContext(MainContext)

  return (
    <Layout.Header>
      {state.profile.name && (
        <div>{`Hello, ${state.profile.name}`}</div>
      )}
    </Layout.Header>
  );
}
