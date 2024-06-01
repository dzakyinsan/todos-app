import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox, Input } from "antd";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  deleteSubTodoAction,
  editSubTodoAction,
  initializeTodoAction,
} from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";
import { IChildren } from "../../types/todo";

type TSubTodo = {
  type: boolean;
  data: IChildren;
  todoKey: string;
  setSelectedRowKeys: Dispatch<SetStateAction<string[]>>;
  selectedRowKeys: string[];
};

const SubTodo = (props: TSubTodo) => {
  const {
    type,
    data: { name, key: subTodoKey },
    todoKey,
    selectedRowKeys,
    setSelectedRowKeys,
  } = props;

  const { state: authState } = useContext(AuthContext);
  const { dispatch } = useContext(TodoContext);

  function onEditSubTodo(value: string) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = authState.email;
    editSubTodoAction(users, email!, todoKey, subTodoKey, value).then(() => {
      initializeTodoAction(dispatch);
    });
  }

  function onDeleteSubTodo() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = authState.email;
    deleteSubTodoAction(users, email!, todoKey, subTodoKey).then(() => {
      setSelectedRowKeys(
        selectedRowKeys.filter((rowkey) => rowkey !== subTodoKey)
      );
      initializeTodoAction(dispatch);
    });
  }

  function onCheck(checked: boolean) {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, subTodoKey]);
    } else {
      const updatedKey = selectedRowKeys.filter((key) => key !== subTodoKey);
      setSelectedRowKeys(updatedKey);
    }
  }

  return (
    <div className="child" key={subTodoKey}>
      <Checkbox
        onChange={(e) => onCheck(e.target.checked)}
        checked={type ? true : selectedRowKeys.includes(subTodoKey)}
        disabled={type}
      >
        {type ? (
          <div>{name}</div>
        ) : (
          <Input
            placeholder="Borderless"
            variant="borderless"
            defaultValue={name}
            onChange={(e) => onEditSubTodo(e.target.value)}
          />
        )}
      </Checkbox>
      <DeleteOutlined onClick={onDeleteSubTodo} />
    </div>
  );
};

export default SubTodo;
