import { TUser } from "../types/auth";
import { IDataTodo } from "../types/todo";

type TUsers = TUser & {
  todo: IDataTodo[];
};

export const initializeTodoAction = (dispatch: any) => {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const email = localStorage.getItem("email") || "";
  const currentUser = users.find((val: any) => val.email === email);

  const renderDataChecked = () => {
    const dataCopy: IDataTodo[] = JSON.parse(JSON.stringify(currentUser.todo));
    const newData = dataCopy?.filter((parent) => {
      if (parent.children && parent.children.length > 0 && parent.isShow) {
        const filteredChildren = parent.children.filter(
          (child) => child.isChecked
        );

        if (filteredChildren.length > 0) {
          parent.children = filteredChildren;
          return true;
        }
        return false;
      } else {
        return parent.isChecked;
      }
    });

    return newData;
  };

  const renderDataUnchecked = () => {
    const dataCopy: IDataTodo[] = JSON.parse(JSON.stringify(currentUser.todo));
    const newData = dataCopy?.filter((parent) => {
      if (parent.children && parent.children.length > 0) {
        const filteredChildren = parent.children.filter(
          (child) => !child.isChecked
        );
        if (filteredChildren.length > 0) {
          parent.children = filteredChildren;
          return true;
        }
        return false;
      } else {
        return !parent.isChecked;
      }
    });
    return newData;
  };

  dispatch({
    type: "INITIALIZE",
    payload: {
      dataChecked: renderDataChecked(),
      dataUnchecked: renderDataUnchecked(),
    },
  });
};

export const addTodoAction = (
  dispatch: any,
  newData: IDataTodo,
  users: TUsers[],
  email: string
) => {
  const currentUser: any = users.find((val: any) => val.email === email);

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
  email: string
) => {
  const currentUser: any = users.find((val: any) => val.email === email);

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
  email: string,
  type: boolean
) => {
  const currentUser: any = users.find((val: any) => val.email === email);

  return new Promise((resolve) => {
    let updatedTodos = [];

    // if delete at checked parent
    if (type && deletedData.children.length) {
      const indexOfKey = currentUser!.todo.findIndex(
        (todo: any) => todo.key === deletedData.key
      );
      const hasFalseChild = currentUser.todo[indexOfKey].children.some(
        (val: any) => !val.isChecked
      );

      if (hasFalseChild) {
        const deleteTrueChild = currentUser.todo[indexOfKey].children.filter(
          (val: any) => !val.isChecked
        );
        const updateChildKeys = deleteTrueChild.map((val: any) => val.key);
        currentUser.todo[indexOfKey].children = deleteTrueChild;
        currentUser.todo[indexOfKey].childrenKeys = updateChildKeys;
        currentUser.todo[indexOfKey].isShow = false;
      } else {
        updatedTodos = currentUser.todo.filter((val: any) => {
          return val.key !== deletedData.key;
        });
        currentUser.todo = updatedTodos;
      }
    } else {
      updatedTodos = currentUser.todo.filter((val: any) => {
        return val.key !== deletedData.key;
      });
      currentUser.todo = updatedTodos;
    }

    const updatedUsers = users.map((val: any) => {
      return val.email === currentUser.email ? currentUser : val;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "DELETE_TODO", payload: updatedTodos });
    resolve("deleted");
  });
};

export const addSubTodoAction = (
  dispatch: any,
  users: TUsers[],
  email: string,
  todoKey: any
) => {
  const currentUser: TUsers | undefined = users.find(
    (val: any) => val.email === email
  );
  const generateKey = "key" + Math.random().toString(16).slice(2);

  return new Promise((resolve: any) => {
    const indexOfKey = currentUser!.todo.findIndex(
      (todo) => todo.key === todoKey
    );

    currentUser!.todo[indexOfKey].children.push({
      key: generateKey,
      name: "sub todo",
      isChecked: false,
    });

    currentUser!.todo[indexOfKey].childrenKeys.push(generateKey);

    const updatedUsers = users.map((val: any) => {
      return val.email === currentUser!.email ? currentUser : val;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "ADD_SUB_TODO", payload: currentUser!.todo });
    resolve();
  });
};

export const editSubTodoAction = (
  users: TUsers[],
  email: string,
  todoKey: string,
  subTodoKey: string,
  value: string
) => {
  const currentUser: TUsers | undefined = users.find(
    (val: any) => val.email === email
  );
  return new Promise((resolve: any) => {
    const indexOfTodo = currentUser!.todo.findIndex(
      (todo) => todo.key === todoKey
    );

    const updatedSubTodos = currentUser!.todo[indexOfTodo].children.map(
      (child) => {
        return child.key === subTodoKey
          ? { key: subTodoKey, name: value, isChecked: false }
          : child;
      }
    );

    currentUser!.todo[indexOfTodo].children = updatedSubTodos;

    const updatedUsers = users.map((val: any) => {
      return val.email === currentUser!.email ? currentUser : val;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resolve();
  });
};

export const deleteSubTodoAction = (
  users: TUsers[],
  email: string,
  todoKey: string,
  subTodoKey: string
) => {
  const currentUser: TUsers | undefined = users.find(
    (val: any) => val.email === email
  );
  return new Promise((resolve: any) => {
    const indexOfTodo = currentUser!.todo.findIndex(
      (todo) => todo.key === todoKey
    );

    const updatedSubTodos = currentUser!.todo[indexOfTodo].children.filter(
      (child) => {
        return child.key !== subTodoKey;
      }
    );
    const updatedChildrenKeys = currentUser!.todo[
      indexOfTodo
    ].childrenKeys.filter((key) => {
      return key !== subTodoKey;
    });

    currentUser!.todo[indexOfTodo].children = updatedSubTodos;
    currentUser!.todo[indexOfTodo].childrenKeys = updatedChildrenKeys;

    const updatedUsers = users.map((val: any) => {
      return val.email === currentUser!.email ? currentUser : val;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resolve();
  });
};

export const setDoneTodoAction = (
  users: TUsers[],
  email: string,
  selectedRowKeys: string[]
) => {
  const currentUser: TUsers | undefined = users.find(
    (val: any) => val.email === email
  );
  return new Promise((resolve: any) => {
    const updatedTodos = currentUser!.todo.map((val) => {
      if (val.children.length) {
        const newChildren = val.children.map((child) => {
          return selectedRowKeys.includes(child.key)
            ? { ...child, isChecked: true }
            : child;
        });
        return { ...val, isShow: true, children: newChildren };
      }

      return selectedRowKeys.includes(val.key)
        ? { ...val, isChecked: true, isShow: true }
        : val;
    });

    currentUser!.todo = updatedTodos;

    const updatedUsers = users.map((val: any) => {
      return val.email === currentUser!.email ? currentUser : val;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resolve();
  });
};
