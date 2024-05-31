import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Dropdown,
  MenuProps,
  Modal,
  Row,
} from "antd";
import { useContext, useEffect, useState } from "react";

import { initializeTodoAction } from "../../actions/todoAction";
import TodoContext from "../../context/todoContext";
import { TModal } from "../../types/global";
import { IDataTodo } from "../../types/todo";
import { AddModal } from "./addModal";
import { DeleteModal } from "./deleteModal";
import { EditModal } from "./editModal";
import "./style.scss";

const TodoContent = () => {
  const {
    state: { data },
    dispatch,
  } = useContext(TodoContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<IDataTodo>({} as IDataTodo);
  const [modal, setModal] = useState<TModal>();

  function onCloseModal() {
    setModal({ open: false });
  }

  function onAddModal() {
    setModal({
      title: "Add Todo",
      className: "todo-modal",
      contentTemplate: <AddModal onClose={onCloseModal} />,
      open: true,
      onCancel: onCloseModal,
      width: 400,
    });
  }

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
        <DeleteModal onClose={onCloseModal} todo={selectedTodo} />
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
    },
    {
      label: <div onClick={onDeleteModal}>Delete</div>,
      key: "1",
    },
    {
      label: <div onClick={() => console.log("a")}>Create Sub Todo</div>,
      key: "3",
    },
  ];

  useEffect(() => {
    initializeTodoAction(dispatch);
  }, []);

  return (
    <section>
      <div className="add-todo-btn">
        <p>Todo</p>
        <Button
          icon={<PlusOutlined />}
          iconPosition={"end"}
          onClick={onAddModal}
        >
          Create Todo
        </Button>
      </div>

      <Row>
        <Col span={12}>
          <Card className="todo-not-checked">
            <p>Not Checked</p>
            {data?.map((val: IDataTodo, i: number) => {
              return (
                <div className="todo-item" key={i}>
                  <Checkbox>{val.name}</Checkbox>
                  <div className="date-action">
                    <p>{val.date}</p>
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
              );
            })}
          </Card>
        </Col>
        <Col span={12}></Col>
      </Row>

      <Modal {...modal} footer={null}>
        {modal?.contentTemplate}
      </Modal>
    </section>
  );
};

export default TodoContent;
