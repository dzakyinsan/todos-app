import { Form, FormProps } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import { addTodoAction } from "../../actions/todoAction";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";
import FormData from "./form";

type FieldType = {
  name?: string;
  date?: any;
};

export const AddModal = ({ onClose }: any) => {
  const [form] = Form.useForm();

  const { dispatch } = useContext(TodoContext);
  const { state } = useContext(AuthContext);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = state.user;
    var key = "key" + Math.random().toString(16).slice(2);

    const formatedValues = {
      key,
      name: values.name!,
      date: dayjs(values.date).format("DD/MM/YYYY HH:mm:ss"),
      overdue: false,
      children: [],
    };

    addTodoAction(dispatch, formatedValues, users, user!).then((val) => {
      onClose();
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      style={{ marginTop: "30px" }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <FormData form={form} onCancel={onClose} />
    </Form>
  );
};
