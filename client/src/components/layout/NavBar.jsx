import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { App } from "antd";

function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    message.success("Logout successful");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#001628",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "16px", marginRight: "10px" }}>
        Nagamanickam
      </span>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        shape="square"
        style={{
          backgroundColor: "#F5222D",
          borderColor: "#F5222D",
          color: "white",
        }}
      />
    </div>
  );
}

export default NavBar;
