import { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../context/authContext";

export const AccessValidator = ({ children }: any) => {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return children;
};
