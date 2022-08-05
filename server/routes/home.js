const express = require("express");
const router = express.Router();

router.get("/getTopCard", (request, response) => {
  const titles = ["访问量", "上传", "下载", "活跃用户"];
  const colors = ["#1890ff", "#2F4056", "#009688", "#FFB800"];
  const smallNames = ["周", "月", "月", "年"];
  const numbers = [
    Math.floor(Math.random() * 100000),
    Math.floor(Math.random() * 100000),
    Math.floor(Math.random() * 100000),
    Math.floor(Math.random() * 100000),
  ];
  const bigNames = ["总访问量", "新上传", "新下载", "近一年"];
  const numNames = ["170万", "29%", "77%", "15%"];
  const data = [];

  for (let index = 0; index < numbers.length; index++) {
    const obj = {
      title: titles[index],
      color: colors[index],
      smallName: smallNames[index],
      number: numbers[index],
      bigName: bigNames[index],
      numName: numNames[index],
    };
    data.push(obj);
  }

  response.send({
    code: 200,
    message: "获取成功",
    data,
  });
});

router.get("/getCenterContent", (request, response) => {
  const visitData = [];
  const uploadData = [];
  const downloadData = [];
  for (let index = 0; index < 12; index++) {
    const number = Math.floor(Math.random() * 100000);
    visitData.push(number);
  }
  for (let index = 0; index < 12; index++) {
    const number = Math.floor(Math.random() * 100000);
    uploadData.push(number);
  }
  for (let index = 0; index < 12; index++) {
    const number = Math.floor(Math.random() * 100000);
    downloadData.push(number);
  }

  const monthVisit = {
    chart_title: "月访问数",
    progress_title: "比上期增长",
    value: Math.floor(Math.random() * 100),
  };
  const monthUpload = {
    chart_title: "月上传数",
    progress_title: "比上期增长",
    value: Math.floor(Math.random() * 100),
  };
  const monthDownload = {
    chart_title: "月下载数",
    progress_title: "比上期增长",
    value: Math.floor(Math.random() * 100),
  };

  const data = {
    visitData,
    uploadData,
    downloadData,
    progressData: [monthVisit, monthUpload, monthDownload],
  };

  response.send({
    code: 200,
    message: "获取成功",
    data,
  });
});

router.get("/getFooterTable", (request, response) => {
  const data = [
    {
      id: "1",
      key: "1",
      taskName: "更新首页实现增删改查要实现的功能表格",
      taskLevel: 1,
    },
    {
      id: "2",
      key: "2",
      taskName: "优化Excel导入导出",
      taskLevel: 3,
    },
    {
      id: "3",
      key: "3",
      taskName: "优化导出ZIP文件",
      taskLevel: 3,
    },
    {
      id: "4",
      key: "4",
      taskName: "升级react-router v6",
      taskLevel: 2,
    },
    {
      id: "5",
      key: "5",
      taskName: "配置vite开发环境和生产环境",
      taskLevel: 2,
    },
    {
      id: "6",
      key: "6",
      taskName: "优化接口的防抖与节流",
      taskLevel: 2,
    },
    {
      id: "7",
      key: "7",
      taskName: "动态主题颜色，动态换肤",
      taskLevel: 3,
    },
    {
      id: "8",
      key: "8",
      taskName: "配置自动化更新部署，CI/CD",
      taskLevel: 2,
    },
    {
      id: "9",
      key: "9",
      taskName: "实现响应式布局，兼容移动设备",
      taskLevel: 2,
    },
    {
      id: "10",
      key: "10",
      taskName: "使用pnpm代替npm包管理器",
      taskLevel: 2,
    },
  ];

  response.send({
    code: 200,
    message: "获取成功",
    data,
  });
});

module.exports = router;
