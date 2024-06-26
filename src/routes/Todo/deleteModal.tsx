import { Button } from "antd";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  deleteTodoAction,
  initializeTodoAction,
} from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";
import { IDataTodo } from "../../types/todo";

type TDeleteModal = {
  type: boolean;
  onClose: () => void;
  setSelectedRowKeys: Dispatch<SetStateAction<string[]>>;
  todo: IDataTodo;
};

export const DeleteModal = ({
  onClose,
  todo,
  setSelectedRowKeys,
  type,
}: TDeleteModal) => {
  const { dispatch } = useContext(TodoContext);
  const { state } = useContext(AuthContext);

  function handleCancel() {
    onClose();
  }

  function handleDelete() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = state.email;
    deleteTodoAction(dispatch, todo, users, email!, type).then((val) => {
      setSelectedRowKeys((prevState) =>
        prevState.filter((rowKey) => rowKey !== todo.key)
      );
      onClose();
      initializeTodoAction(dispatch);
    });
  }
  return (
    <div>
      <div style={{ margin: "30px 10px" }}>
        Are you sure want to delete {todo.name} ?
      </div>
      <div className="footer">
        <Button className="save-btn" onClick={handleDelete}>
          Confirm
        </Button>
        <Button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
