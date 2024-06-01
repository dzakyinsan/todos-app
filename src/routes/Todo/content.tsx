import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";

import { initializeTodoAction } from "../../actions/todoAction";
import TodoContext from "../../context/todoContext";
import { TModal } from "../../types/global";
import EmptyData from "./../../assets/no-data.svg";
import { AddModal } from "./addModal";
import "./style.scss";
import TodoCard from "./todoCard";

const TodoContent = () => {
  const {
    state: { data, dataChecked },
    dispatch,
  } = useContext(TodoContext);
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

  useEffect(() => {
    initializeTodoAction(dispatch);
  }, []);

  console.log({ data });

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

      {data?.length ? (
        <Row gutter={16}>
          <Col span={12}>
            <TodoCard
              title={"Not Checked"}
              type={false}
              data={data || []}
              onCloseModal={onCloseModal}
              setModal={setModal}
              dispatch={dispatch}
            />
          </Col>
          <Col span={12}>
            <TodoCard
              title={"Checked"}
              type={true}
              data={dataChecked || []}
              onCloseModal={onCloseModal}
              setModal={setModal}
              dispatch={dispatch}
            />
          </Col>
        </Row>
      ) : (
        <div className="empty-img">
          <img src={EmptyData} alt="empty-data" />
        </div>
      )}

      <Modal {...modal} footer={null}>
        {modal?.contentTemplate}
      </Modal>
    </section>
  );
};

export default TodoContent;
