import { TUser } from "../types/auth";
import { IDataTodo } from "../types/todo";

type TUsers = TUser & {
  todo: IDataTodo;
};

export const initializeTodoAction = (dispatch: any) => {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = localStorage.getItem("user") || "";
  const currentUser = users.find((val: any) => val.email === user);

  dispatch({ type: "INITIALIZE", payload: currentUser?.todo });
};

export const addTodoAction = (
  dispatch: any,
  newData: IDataTodo,
  users: TUsers[],
  user: string
) => {
  const currentUser: any = users.find((val: any) => val.email === user);

  return new Promise((resolve, reject) => {
    if (currentUser) {
      currentUser.todo = [...currentUser.todo, newData];
      const newUsers = users.map((val: any) => {
        return val.email === currentUser.email ? currentUser : val;
      });

      localStorage.setItem("users", JSON.stringify(newUsers));
      dispatch({ type: "ADD_TODO", payload: newData });
      resolve("add todo success");
    }
  });
};

export const editTodoAction = (
  dispatch: any,
  newData: IDataTodo,
  users: TUsers[],
  user: string
) => {
  const currentUser: any = users.find((val: any) => val.email === user);

  return new Promise((resolve, reject) => {
    if (currentUser) {
      const keyNewData = newData.key;
      const updatedTodos = currentUser.todo.map((val: any) => {
        return val.key === keyNewData ? newData : val;
      });
      currentUser.todo = updatedTodos;

      const updatedUsers = users.map((val: any) => {
        return val.email === currentUser.email ? currentUser : val;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      dispatch({ type: "EDIT_TODO", payload: updatedTodos });
      resolve("edit todo success");
    }
  });
};

export const deleteTodoAction = (
  dispatch: any,
  deletedData: IDataTodo,
  users: TUsers[],
  user: string
) => {
  const currentUser: any = users.find((val: any) => val.email === user);

  return new Promise((resolve) => {
    const updatedTodos = currentUser.todo.filter((val: any) => {
      return val.key !== deletedData.key;
    });

    currentUser.todo = updatedTodos;

    const updatedUsers = users.map((val: any) => {
      return val.email === currentUser.email ? currentUser : val;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "DELETE_TODO", payload: updatedTodos });
    resolve("deleted");
  });
};
