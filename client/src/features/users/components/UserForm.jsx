import { Form, Input } from "antd";
import { useEffect } from "react";

function UserForm({ form, user }) {
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="first_name"
        label="First Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Last Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default UserForm;
