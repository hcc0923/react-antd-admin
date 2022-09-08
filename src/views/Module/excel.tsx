import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Spin, Card, Input, Upload, Table, Button } from "antd";
import * as XLSX from "xlsx";

type DataType = Array<object>;
const Excel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [tableData, setTableData] = useState<DataType>([]);
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState("file");
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const data: Array<object> = [
    { id: "1", name: "张三", gender: "男", age: 23, work: "程序员" },
    { id: "2", name: "李四", gender: "女", age: 21, work: "程序员" },
    { id: "3", name: "王五", gender: "女", age: 21, work: "程序员" },
    { id: "4", name: "马六", gender: "男", age: 21, work: "程序员" },
    { id: "5", name: "赵七", gender: "女", age: 21, work: "程序员" },
  ];
  const dataMap: any = {
    id: "ID",
    name: formatMessage("module.excel.name"),
    gender: formatMessage("module.excel.gender"),
    age: formatMessage("module.excel.age"),
    work: formatMessage("module.excel.work"),
  };
  const columns: DataType = [
    {
      align: "center",
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      align: "center",
      title: formatMessage("module.excel.name"),
      key: "name",
      dataIndex: "name",
    },
    {
      align: "center",
      title: formatMessage("module.excel.gender"),
      key: "gender",
      dataIndex: "gender",
    },
    {
      align: "center",
      title: formatMessage("module.excel.age"),
      key: "age",
      dataIndex: "age",
    },
    {
      align: "center",
      title: formatMessage("module.excel.work"),
      key: "work",
      dataIndex: "work",
    },
  ];
  const sheetToBlob = (sheet: object, sheetName?: string) => {
    console.log(sheet, sheetName);

    sheetName = sheetName || "sheet1";
    const workBook: any = {
      SheetNames: [sheetName],
      Sheets: {},
    };
    workBook.Sheets[sheetName] = sheet;
    const options: object = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };
    const XLSXBook = XLSX.write(workBook, options);
    function stringToArrayBuffer(str: string) {
      const buffer = new ArrayBuffer(str.length);
      const unit8Array = new Uint8Array(buffer);
      for (let index = 0; index !== str.length; ++index) {
        unit8Array[index] = str.charCodeAt(index) & 0xff;
      }
      return buffer;
    }
    const blob = new Blob([stringToArrayBuffer(XLSXBook)], {
      type: "application/octet-stream",
    });
    return blob;
  };
  const openDownloadDialog = (blob: any, saveName: string) => {
    const url = URL.createObjectURL(blob);

    const aLink = document.createElement("a");

    aLink.href = url;
    aLink.download = saveName || "";
    const event = new MouseEvent("click");
    aLink.dispatchEvent(event);
  };
  const handleExportAll = () => {
    setSpinning(true);

    const newData = data.map((item: any) => {
      return Object.keys(item).reduce((newItem: any, key: string) => {
        const newKey = dataMap[key];
        newItem[newKey] = item[key];
        return newItem;
      }, {});
    });

    const sheet = XLSX.utils.json_to_sheet(newData);
    openDownloadDialog(sheetToBlob(sheet, undefined), `${fileName}.xlsx`);
    setSpinning(false);
  };
  const formatTitleAndFileld = (a: any, b: any) => {
    const rowMap: any = {};
    columns.forEach((item: any) => (rowMap[item[a]] = item[b]));
    return rowMap;
  };
  const handleImportJSON = (array: any, file: any) => {
    const header = array[0];
    const rowMap = formatTitleAndFileld("title", "dataIndex");
    const firstRow = header.map((item: any) => rowMap[item]);

    const newArray = [...array];

    newArray.splice(0, 1);

    const JSON = newArray.map((items) => {
      const newItem: any = {};
      items.forEach((item: any, index: number) => {
        const newKey = firstRow[index] || index;
        newItem[newKey] = item;
      });
      return newItem;
    });

    const formatData: any = JSON.map((item) => {
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
    const fileArray: any = [file];
    setFileList(fileArray);
    return formatData;
  };
  const handleBeforeUploadFile = (file: any) => {
    setSpinning(true);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (event: any) => {
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
      <Card title={formatMessage("module.excel.title")}>
        <div className="mb-4">
          <Input
            className="w-1/4 mb-2 mr-4"
            placeholder={formatMessage("module.excel.placeholder")}
            onChange={(event) => setFileName(event.target.value)}
          />
          <Button className="mr-4" type="primary" onClick={handleExportAll}>
            {formatMessage("module.excel.button_export")}
          </Button>
          <Upload
            accept=".xlsx"
            fileList={fileList}
            showUploadList={true}
            beforeUpload={handleBeforeUploadFile}
            onRemove={handleRemoveFile}
          >
            <Button type="primary">
              {formatMessage("module.excel.button_import")}
            </Button>
          </Upload>
        </div>
        <Table
          bordered={true}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey={(record: any) => `${record.id}`}
        />
      </Card>
    </Spin>
  );
};

export default Excel;
