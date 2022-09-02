import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Table, Input, Button } from "antd";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import SpinCard from "@/components/SpinCard";

type DataType = Array<object>;
const Zip = () => {
  const [spinning, setSpinning] = useState(false);
  const [fileName, setFileName] = useState("file");
  const [tableData, setTableData] = useState<DataType>([]);
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const data: DataType = [
    { id: "1", name: "张三", gender: "男", age: 23, work: "程序员" },
    { id: "2", name: "李四", gender: "女", age: 21, work: "程序员" },
    { id: "3", name: "王五", gender: "女", age: 21, work: "程序员" },
    { id: "4", name: "马六", gender: "男", age: 21, work: "程序员" },
    { id: "5", name: "赵七", gender: "女", age: 21, work: "程序员" },
  ];
  const columns: DataType = [
    {
      align: "center",
      title: formatMessage("module.zip.name"),
      key: "name",
      dataIndex: "name",
    },
    {
      align: "center",
      title: formatMessage("module.zip.gender"),
      key: "gender",
      dataIndex: "gender",
    },
    {
      align: "center",
      title: formatMessage("module.zip.age"),
      key: "age",
      dataIndex: "age",
    },
    {
      align: "center",
      title: formatMessage("module.zip.work"),
      key: "work",
      dataIndex: "work",
    },
  ];
  const handleExportZip = () => {
    setSpinning(true);
    const zip = new JSZip();

    let contentString = "";
    tableData.forEach((item: any) => {
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
    <SpinCard spinning={spinning} title={formatMessage("module.zip.title")}>
      <Input
        className="w-1/4 mr-4"
        placeholder={formatMessage("module.zip.placeholder")}
        onChange={(event) => setFileName(event.target.value)}
      />
      <Button type="primary" onClick={handleExportZip}>
        {formatMessage("module.zip.button_export")}
      </Button>
      <Table
        className="mt-4"
        bordered={true}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey={(record: any) => `${record.id}`}
      />
    </SpinCard>
  );
};

export default Zip;
