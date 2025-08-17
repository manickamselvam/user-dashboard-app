import LoginForm from "./components/LoginForm";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "./authSlice";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { App } from "antd";

function AuthPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleLogin = async (values) => {
    try {
      const data = await login(values);
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data.token));
      message.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      message.error("Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}

export default AuthPage;
