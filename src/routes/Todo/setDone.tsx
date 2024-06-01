import { Button } from "antd";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  initializeTodoAction,
  setDoneTodoAction,
} from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";

type TSetDone = {
  onClose: () => void;
  setSelectedRowKeys: Dispatch<SetStateAction<string[]>>;
  selectedRowKeys: string[];
};

export const SetDoneModal = ({
  onClose,
  selectedRowKeys,
  setSelectedRowKeys,
}: TSetDone) => {
  const { dispatch } = useContext(TodoContext);
  const { state } = useContext(AuthContext);

  function handleCancel() {
    onClose();
  }

  function handleSetDone() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = state.email;
    setDoneTodoAction(users, email!, selectedRowKeys).then((val) => {
      setSelectedRowKeys([]);
      initializeTodoAction(dispatch);
      onClose();
    });
  }

  return (
    <div>
      <div style={{ margin: "30px 10px" }}>
        Are you sure want to set the task to done ?
      </div>
      <div className="footer">
        <Button className="save-btn" onClick={handleSetDone}>
          Confirm
        </Button>
        <Button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
