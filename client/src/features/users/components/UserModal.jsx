import { Modal, Form } from "antd";
import UserForm from "./UserForm";

function UserModal({ open, onClose, onSubmit, user }) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={user ? "Edit User" : "Create User"}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      okText={user ? "Update" : "Create"}
    >
      <UserForm form={form} user={user} />
    </Modal>
  );
}

export default UserModal;
