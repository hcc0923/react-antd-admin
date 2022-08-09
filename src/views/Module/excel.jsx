import React, { useState, useEffect } from "react";
import { Spin, Card, Input, Upload, Table, Button } from "antd";
import * as XLSX from "xlsx";

const data = [
  { id: "1", name: "张三", gender: "男", age: 23, work: "程序员" },
  { id: "2", name: "李四", gender: "女", age: 21, work: "程序员" },
  { id: "3", name: "王五", gender: "女", age: 21, work: "程序员" },
  { id: "4", name: "马六", gender: "男", age: 21, work: "程序员" },
  { id: "5", name: "赵七", gender: "女", age: 21, work: "程序员" },
];
const dataMap = {
  id: "ID",
  name: "姓名",
  gender: "性别",
  age: "年龄",
  work: "工作",
};

const Excel = () => {
  const [spinning, setSpinning] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState("file");

  const columns = [
    {
      align: "center",
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
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
  const sheetToBlob = (sheet, sheetName) => {
    sheetName = sheetName || "sheet1";
    const workBook = {
      SheetNames: [sheetName],
      Sheets: {},
    };
    workBook.Sheets[sheetName] = sheet;
    const options = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };
    const XLSXBook = XLSX.write(workBook, options);
    function stringToArrayBuffer(string) {
      const buffer = new ArrayBuffer(string.length);
      const unit8Array = new Uint8Array(buffer);
      for (let index = 0; index !== string.length; ++index) {
        unit8Array[index] = string.charCodeAt(index) & 0xff;
      }
      return buffer;
    }
    const blob = new Blob([stringToArrayBuffer(XLSXBook)], {
      type: "application/octet-stream",
    });
    return blob;
  };
  const openDownloadDialog = (blob, saveName) => {
    const url = URL.createObjectURL(blob);

    const aLink = document.createElement("a");

    aLink.href = url;
    aLink.download = saveName || "";
    const event = new MouseEvent("click");
    aLink.dispatchEvent(event);
  };
  const handleExportAll = () => {
    setSpinning(true);

    const newData = data.map((item) => {
      return Object.keys(item).reduce((newItem, key) => {
        const newKey = dataMap[key];
        newItem[newKey] = item[key];
        return newItem;
      }, {});
    });

    const sheet = XLSX.utils.json_to_sheet(newData);
    openDownloadDialog(sheetToBlob(sheet, undefined), `${fileName}.xlsx`);
    setSpinning(false);
  };
  const formatTitleAndFileld = (a, b) => {
    const rowMap = {};
    columns.forEach((item) => (rowMap[item[a]] = item[b]));
    return rowMap;
  };
  const handleImportJSON = (array, file) => {
    const header = array[0];
    const rowMap = formatTitleAndFileld("title", "dataIndex");
    const firstRow = header.map((item) => rowMap[item]);

    const newArray = [...array];

    newArray.splice(0, 1);

    const JSON = newArray.map((items) => {
      const newItem = {};
      items.forEach((item, index) => {
        const newKey = firstRow[index] || index;
        newItem[newKey] = item;
      });
      return newItem;
    });

    const formatData = JSON.map((item) => {
      const { id, name, gender, age, work } = item;
      return {
        id,
        name,
        gender,
        age,
        work,
      };
    });
    setTableData(formatData);
    setFileList([file]);
    return formatData;
  };
  const handleBeforeUploadFile = (file) => {
    setSpinning(true);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (event) => {
      const list = event.target.result;

      // try parse list
      const workBook = XLSX.read(list, { type: "binary" });

      // parse sheet to json
      const JSONList = XLSX.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[0]],
        { header: 1 }
      );

      handleImportJSON(JSONList, file);
    });
    fileReader.readAsBinaryString(file);
    setSpinning(false);
    return false;
  };
  const handleRemoveFile = () => {
    setTableData([]);
    setFileList([]);
  };
  useEffect(() => {
    setTableData(data);
  }, []);

  return (
    <Spin spinning={spinning}>
      <Card title="Excel导入导出">
        <div className="mb-4">
          <Input
            className="w-1/4 mb-2 mr-4"
            placeholder="请输入文件名(默认file)"
            onChange={(event) => setFileName(event.target.value)}
          />
          <Button className="mr-4" type="primary" onClick={handleExportAll}>
            Excel导出
          </Button>
          <Upload
            accept=".xlsx"
            fileList={fileList}
            showUploadList={true}
            beforeUpload={handleBeforeUploadFile}
            onRemove={handleRemoveFile}
          >
            <Button type="primary">Excel导入</Button>
          </Upload>
        </div>

        <Table
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

export default Excel;
