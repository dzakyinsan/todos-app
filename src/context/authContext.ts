import { createContext } from "react";
import { TAuthState } from "../types/auth";

type TAuthContext = {
  state: TAuthState;
  dispatch: React.Dispatch<any>;
};

const AuthContext = createContext({} as TAuthContext);

export default AuthContext;
