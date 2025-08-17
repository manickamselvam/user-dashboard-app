import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function LoginForm({ onSubmit }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="login"
        onFinish={onSubmit}
        layout="vertical"
        style={{
          width: "450px",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "25px",
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter Your Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter Your Password"
          />
        </Form.Item>

        <Form.Item>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
