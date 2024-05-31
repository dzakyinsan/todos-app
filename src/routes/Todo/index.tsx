import { useReducer } from "react";
import TodoContext from "../../context/todoContext";
import { initialState, reducer } from "../../reducer/todoReducer";
import TodoContent from "./content";

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <TodoContent />
    </TodoContext.Provider>
  );
};

export default Todo;
