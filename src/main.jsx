import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import store from "@/store/store.js";
import Router from "@/router/index";
import "./main.less";

const App = () => {
  if (!window.global) window.global = globalThis;
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
