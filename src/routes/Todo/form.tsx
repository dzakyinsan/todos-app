import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { IDataTodo } from "../../types/todo";

type IFormData = {
  form: any;
  onCancel: () => void;
  initialValues?: IDataTodo;
};

const FormData = ({ form, onCancel, initialValues }: IFormData) => {
  function handleCancel() {
    form.resetFields();
    onCancel();
  }

  if (initialValues) {
    form.setFieldsValue({
      name: initialValues.name,
      date: dayjs(initialValues.date, "DD/MM/YYYY HH:mm:ss"),
    });
  }

  return (
    <>
      <Form.Item
        label="Todo"
        name="name"
        rules={[{ required: true, message: "Please input todo!" }]}
        style={{ marginBottom: "10px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input date!" }]}
      >
        <DatePicker className="date-picker" showTime />
      </Form.Item>
      <Form.Item>
        <div className="footer">
          <Button htmlType="submit" className="save-btn">
            Save
          </Button>
          <Button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default FormData;
