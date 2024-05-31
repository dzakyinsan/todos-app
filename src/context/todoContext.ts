import { createContext } from "react";
import { TTodoState } from "../types/todo";

type TTodoContext = {
  state: TTodoState;
  dispatch: React.Dispatch<any>;
};

const TodoContext = createContext({} as TTodoContext);

export default TodoContext;
