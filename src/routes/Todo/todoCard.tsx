import { MoreOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Dropdown, MenuProps } from "antd";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  addSubTodoAction,
  initializeTodoAction,
} from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import { IDataTodo } from "../../types/todo";
import { DeleteModal } from "./deleteModal";
import { EditModal } from "./editModal";
import { SetDoneModal } from "./setDone";
import SubTodo from "./subTodo";

type TTodoCard = {
  type: boolean;
  data: IDataTodo[];
  onCloseModal: () => void;
  setModal: Dispatch<SetStateAction<any>>;
  dispatch: any;
  title: string;
};

const TodoCard = (props: TTodoCard) => {
  const { type, data, onCloseModal, setModal, dispatch, title } = props;
  const [selectedTodo, setSelectedTodo] = useState<IDataTodo>({} as IDataTodo);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { state: authState } = useContext(AuthContext);

  function onEditModal() {
    setModal({
      title: "Edit Todo",
      className: "todo-modal",
      contentTemplate: <EditModal onClose={onCloseModal} todo={selectedTodo} />,
      open: true,
      onCancel: onCloseModal,
      width: 400,
    });
  }

  function onDeleteModal() {
    setModal({
      title: "Confirm Delete",
      className: "todo-modal",
      contentTemplate: (
        <DeleteModal
          type={type}
          onClose={onCloseModal}
          todo={selectedTodo}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      ),
      open: true,
      onCancel: onCloseModal,
      width: 400,
    });
  }

  function onAddSubTodo() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = authState.email;
    const todoKey = selectedTodo.key;
    addSubTodoAction(dispatch, users, email!, todoKey).then(() => {
      onCloseModal();
      initializeTodoAction(dispatch);
    });
  }

  function onCheck(checked: boolean, subKeys: string[], todoKey: string) {
    if (checked) {
      let newArr: string[] = [];
      if (subKeys.length) newArr = [...selectedRowKeys, ...subKeys];
      else newArr = [...selectedRowKeys, todoKey];

      const uniqueArray = newArr.filter(function (item, pos) {
        return newArr.indexOf(item) == pos;
      });
      setSelectedRowKeys(uniqueArray);
    } else {
      let updatedKey: string[] = [];

      if (subKeys.length) {
        updatedKey = selectedRowKeys.filter(
          (rowkey) => !subKeys.includes(rowkey)
        );
      } else {
        updatedKey = selectedRowKeys.filter((rowkey) => rowkey !== todoKey);
      }

      setSelectedRowKeys(updatedKey);
    }
  }

  function setDone() {
    setModal({
      title: "Set to Done",
      className: "todo-modal",
      contentTemplate: (
        <SetDoneModal
          onClose={onCloseModal}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      ),
      open: true,
      onCancel: onCloseModal,
      width: 400,
    });
  }

  const items: MenuProps["items"] = [
    {
      label: <div onClick={onEditModal}>Edit</div>,
      key: "0",
      disabled: type,
    },
    {
      label: <div onClick={onDeleteModal}>Delete</div>,
      key: "1",
    },
    {
      label: <div onClick={onAddSubTodo}>Create Sub Todo</div>,
      key: "3",
      disabled: type,
    },
  ];

  const checkDate = (date: string, type: "text" | "class") => {
    const dateOnly = date.split(" ")[0];

    const today = dayjs().startOf("day");
    const dateToCheck = dayjs(date, "DD/MM/YYYY").startOf("day");

    if (dateToCheck.isSame(today)) {
      return type === "text" ? "Today" : "today";
    } else if (dateToCheck.isBefore(today)) {
      return type === "text" ? `overdue - ${dateOnly}` : "overdue";
    } else {
      return type === "text" ? dateOnly : "future";
    }
  };

  return (
    <Card className="todo-not-checked">
      <div className="todo-title">
        <p>{title}</p>
        {selectedRowKeys.length > 0 && (
          <Button onClick={setDone}>Set Done</Button>
        )}
      </div>
      {data
        .sort((a, b) =>
          dayjs(a.date, "DD/MM/YYYY HH:mm:ss").isAfter(
            dayjs(b.date, "DD/MM/YYYY HH:mm:ss")
          )
            ? 1
            : -1
        )
        ?.map((val: IDataTodo, i: number) => {
          const itemKeys = selectedRowKeys.filter((key) =>
            val.childrenKeys.includes(key)
          ).length;

          const indeterminate =
            itemKeys > 0 && itemKeys < val.childrenKeys.length;

          const checkall = () => {
            if (val.children.length) {
              return itemKeys === val.childrenKeys.length && itemKeys !== 0;
            } else {
              return selectedRowKeys.includes(val.key);
            }
          };

          return (
            <div className="todo-item" key={i}>
              <div className="parent">
                <Checkbox
                  indeterminate={indeterminate}
                  checked={type ? true : checkall()}
                  disabled={type}
                  onChange={(e) =>
                    onCheck(e.target.checked, val.childrenKeys, val.key)
                  }
                >
                  {val.name}
                </Checkbox>
                <div className="date-action">
                  <p className={checkDate(val.date, "class")}>
                    {checkDate(val.date, "text")}
                  </p>
                  <div>
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTodo(val);
                        }}
                      >
                        <MoreOutlined />
                      </p>
                    </Dropdown>
                  </div>
                </div>
              </div>
              {val?.children?.map((child, i) => (
                <SubTodo
                  key={i}
                  type={type}
                  data={child}
                  todoKey={val.key}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              ))}
            </div>
          );
        })}
    </Card>
  );
};

export default TodoCard;
