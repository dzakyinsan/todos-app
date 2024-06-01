import { Form, FormProps } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import { editTodoAction } from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";
import { IDataTodo } from "../../types/todo";
import FormData from "./form";

type FieldType = {
  name?: string;
  date?: any;
};

type TEditModal = {
  onClose: () => void;
  todo: IDataTodo;
};

export const EditModal = ({ onClose, todo }: TEditModal) => {
  const [form] = Form.useForm();

  const { dispatch } = useContext(TodoContext);
  const { state } = useContext(AuthContext);

  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = state.email;

    const formatedValues = {
      ...todo,
      name: values.name!,
      date: dayjs(values.date).format("DD/MM/YYYY HH:mm:ss"),
    };

    editTodoAction(dispatch, formatedValues, users, email!).then((val) => {
      onClose();
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      style={{ marginTop: "30px" }}
      autoComplete="off"
    >
      <FormData
        form={form}
        onCancel={onClose}
        initialValues={todo}
        onFinish={onFinish}
      />
    </Form>
  );
};
