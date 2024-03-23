import { createContext } from "react";

type TMainContext = {
  state: {
    myPokemons: any[];
  };
  dispatch: React.Dispatch<any>;
};

const MainContext = createContext({} as TMainContext);

export default MainContext;
