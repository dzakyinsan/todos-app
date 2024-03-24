import { createContext } from "react";
import { TState } from "../reducer/mainReducer";

type TMainContext = {
  state: TState;
  dispatch: React.Dispatch<any>;
};

const MainContext = createContext({} as TMainContext);

export default MainContext;
