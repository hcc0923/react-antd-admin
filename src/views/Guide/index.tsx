import React from "react";
import { Card } from "antd";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";

const Guide = () => {
  const steps = [
    {
      title: "欢迎使用react-antd-admin",
      intro: "react-antd-admin是一个中后台的管理系统，使用最新的Package。",
    },
    {
      element: "#hamburger",
      intro: "控制侧边栏折叠展开",
    },
    {
      element: "#breadcrumb",
      intro: "面包屑显示当前页面的路径",
    },
    {
      element: "#fullscreen",
      intro: "全屏切换",
    },
    {
      element: "#intl",
      intro: "国际化切换",
    },
    {
      element: "#settings",
      intro: "一些简单的系统设置",
    },
  ];
  const onExit = () => {};
  return (
    <Card title="项目引导">
        <Steps enabled={true} steps={steps} initialStep={0} onExit={onExit} />
    </Card>
  );
};

export default Guide;
