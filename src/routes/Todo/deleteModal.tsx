import { Button } from "antd";
import { useContext } from "react";
import {
  deleteTodoAction,
  initializeTodoAction,
} from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";
import { IDataTodo } from "../../types/todo";

type TDeleteModal = {
  onClose: () => void;
  todo: IDataTodo;
};

export const DeleteModal = ({ onClose, todo }: TDeleteModal) => {
  const { dispatch } = useContext(TodoContext);
  const { state } = useContext(AuthContext);

  function handleCancel() {
    onClose();
  }

  function handleDelete() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = state.user;
    deleteTodoAction(dispatch, todo, users, user!).then((val) => {
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
