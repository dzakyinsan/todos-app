import { Button, DatePicker, Form, FormInstance, Input } from "antd";
import dayjs from "dayjs";
import { IDataTodo } from "../../types/todo";

type IFormData = {
  form: FormInstance<any>;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues?: IDataTodo;
};

const FormData = ({ form, onCancel, initialValues, onFinish }: IFormData) => {
  function handleCancel() {
    form.resetFields();
    onCancel();
  }

  function onSubmit() {
    const values = form.getFieldsValue();
    onFinish(values);
    form.resetFields();
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
        <DatePicker
          className="date-picker"
          showTime
          minDate={initialValues ? undefined : dayjs()}
        />
      </Form.Item>
      <Form.Item>
        <div className="footer">
          <Button onClick={onSubmit} className="save-btn">
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
