import React, { useState, useEffect } from "react";
import { Spin, Card, Table, Input, Button } from "antd";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const data = [
  { id: "1", name: "张三", gender: "男", age: 23, work: "程序员" },
  { id: "2", name: "李四", gender: "女", age: 21, work: "程序员" },
  { id: "3", name: "王五", gender: "女", age: 21, work: "程序员" },
  { id: "4", name: "马六", gender: "男", age: 21, work: "程序员" },
  { id: "5", name: "赵七", gender: "女", age: 21, work: "程序员" },
];

const Zip = () => {
  const [spinning, setSpinning] = useState(false);
  const [fileName, setFileName] = useState("file");
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      align: "center",
      title: "姓名",
      key: "name",
      dataIndex: "name",
    },
    {
      align: "center",
      title: "性别",
      key: "gender",
      dataIndex: "gender",
    },
    {
      align: "center",
      title: "年龄",
      key: "age",
      dataIndex: "age",
    },
    {
      align: "center",
      title: "工作",
      key: "work",
      dataIndex: "work",
    },
  ];
  const handleExportZip = () => {
    setSpinning(true);
    const zip = new JSZip();

    let contentString = "";
    tableData.forEach((item) => {
      contentString +=
        item["name"] +
        " " +
        item["gender"] +
        " " +
        item["age"] +
        " " +
        item["work"] +
        "\n";
    });

    zip.file(`${fileName}.txt`, contentString);
    zip
      .generateAsync({ type: "blob" })
      .then((blob) => {
        saveAs(blob, `${fileName}.zip`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSpinning(false);
      });
  };
  useEffect(() => {
    setTableData(data);
  }, []);

  return (
    <Spin spinning={spinning}>
      <Card title="导出zip">
        <Input
          className="w-1/4 mr-4"
          placeholder="请输入文件名(默认file)"
          onChange={(event) => setFileName(event.target.value)}
        />
        <Button type="primary" onClick={handleExportZip}>
          导出Zip
        </Button>
        <Table
          className="mt-4"
          bordered={true}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey={(record) => `${record.id}`}
        />
      </Card>
    </Spin>
  );
};

export default Zip;
