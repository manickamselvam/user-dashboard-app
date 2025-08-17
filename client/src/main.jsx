import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App as AntdApp } from "antd";
import "antd/dist/reset.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AntdApp>
      <App />
    </AntdApp>
  </Provider>
);
