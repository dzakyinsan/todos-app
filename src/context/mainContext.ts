import { createContext } from "react";

export const initialState = {
  count: 0
}

const MainContext = createContext({} as IMainContext )

export default MainContext