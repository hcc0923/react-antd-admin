import React, { useState } from "react";
import { Spin, Card, Tabs, List, Upload, Space, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { formatGMTTime } from "@/utils";
import { SERVER_ADDRESS } from "@/utils/config";
import {
  uploadMultipleFile,
  getAllFileList,
  getMyUploadList,
  deleteSingleFile,
  deleteAllFile,
} from "@/api/file";

const FileAdmin = () => {
  const [spinning, setSpinning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFileList, setUploadFileList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [myUploadList, setMyUploadList] = useState([]);
  const { loading: loadingMultipleFile, runAsync: runUploadMultipleFile } =
    useRequest((params) => uploadMultipleFile(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingGetAllFileList, runAsync: runGetAllFileList } =
    useRequest(getAllFileList, { manual: true, throttleWait: 1000 });
  const { loading: loadingGetMyUploadList, runAsync: runGetMyUploadList } =
    useRequest(getMyUploadList, { manual: true, throttleWait: 1000 });
  const { loading: loadingDeleteSingleFile, runAsync: runDeleteSingleFile } =
    useRequest((params) => deleteSingleFile(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingDeleteAllFile, runAsync: runDeleteAllFile } =
    useRequest((params) => deleteAllFile(params), {
      manual: true,
      throttleWait: 1000,
    });

  const handleBeforeUploadFile = (fileList) => {
    setUploadFileList([...uploadFileList, ...fileList]);
    return false;
  };
  const handleRemoveFile = (file) => {
    const index = uploadFileList.indexOf(file);
    const newUploadFileList = uploadFileList.slice();
    newUploadFileList.splice(index, 1);
    setUploadFileList(newUploadFileList);
  };
  const handleUploadFileList = () => {
    setUploading(true);

    const formData = new FormData();
    uploadFileList.forEach((file) => {
      formData.append("files", file);
    });

    runUploadMultipleFile(formData)
      .then(() => {
        setUploadFileList([]);
        message.success("上传成功");
      })
      .catch((error) => {
        console.log(error);
        message.success("上传失败");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const handleGetAllFileList = () => {
    runGetAllFileList()
      .then((response) => {
        const { result } = response;
        setFileList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetMyUploadFileList = () => {
    runGetMyUploadList()
      .then((response) => {
        const { result } = response;
        setMyUploadList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTabChange = (key) => {
    switch (key) {
      case "filelist":
        handleGetAllFileList();
        break;
      case "myupload":
        handleGetMyUploadFileList();
        break;
      default:
        break;
    }
  };
  const handleDownloadFile = (type) => {
    setSpinning(true);
    switch (type) {
      case "filelist":
        fileList.forEach((file) => {
          const name = file.name;
          window.open(`${SERVER_ADDRESS}/${name}`);
        });
        setSpinning(false);
        break;
      case "myupload":
        myUploadList.forEach((file) => {
          const name = file.name;
          window.open(`${SERVER_ADDRESS}/${name}`);
        });
        setSpinning(false);
        break;
      default:
        window.open(`${SERVER_ADDRESS}/${type.name}`);
        setSpinning(false);
        break;
    }
  };
  const handleDeleteFile = (data) => {
    if (data === "uploadlist") {
      const deleteParams = myUploadList.map((file) => {
        return {
          id: file.id,
          name: file.name,
        };
      });
      const params = { deleteParams };
      runDeleteAllFile(params)
        .then(() => {
          handleGetMyUploadFileList();
          message.success("删除成功");
        })
        .catch((error) => {
          console.log(error);
          message.error("删除失败");
        });
    } else {
      const params = { id: data.id, name: data.name };
      runDeleteSingleFile(params)
        .then(() => {
          handleGetMyUploadFileList();
          message.success("删除成功");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Spin
      spinning={
        loadingMultipleFile ||
        loadingGetAllFileList ||
        loadingGetMyUploadList ||
        loadingDeleteSingleFile ||
        loadingDeleteAllFile ||
        spinning
      }
    >
      <Card title="文件管理">
        <Tabs defaultActiveKey="upload" onChange={handleTabChange}>
          <Tabs.TabPane tab="上传文件" key="upload">
            <Upload.Dragger
              maxCount={10}
              multiple={true}
              fileList={uploadFileList}
              beforeUpload={(_, fileList) => handleBeforeUploadFile(fileList)}
              onRemove={handleRemoveFile}
              name="files"
              className="w-1/4"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">支持拖拽上传和点击上传</p>
            </Upload.Dragger>
            <Button
              type="primary"
              onClick={handleUploadFileList}
              disabled={uploadFileList.length === 0}
              loading={uploading}
              className="mt-4"
            >
              {uploading ? "上传中..." : "上传"}
            </Button>
          </Tabs.TabPane>
          <Tabs.TabPane tab="文件列表" key="filelist">
            <List
              size="large"
              bordered
              footer={
                fileList.length === 0 ? (
                  ""
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handleDownloadFile("filelist")}
                  >
                    下载全部
                  </Button>
                )
              }
              dataSource={fileList}
              renderItem={(item) => (
                <List.Item key={item.id} className="flex justify-between">
                  <span
                    className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer text-green-700"
                    onClick={() => handleDownloadFile(item)}
                  >
                    {item.originalname}
                  </span>
                  <span className="w-1/4 text-center">
                    {formatGMTTime(item.time)}
                  </span>
                  <Space>
                    <Button
                      type="default"
                      onClick={() => handleDownloadFile(item)}
                    >
                      下载
                    </Button>
                  </Space>
                </List.Item>
              )}
            ></List>
          </Tabs.TabPane>
          <Tabs.TabPane tab="我的上传" key="myupload">
            <List
              size="large"
              bordered
              footer={
                myUploadList.length === 0 ? (
                  ""
                ) : (
                  <div>
                    <Button
                      className="mr-2"
                      type="primary"
                      onClick={() => handleDownloadFile("myupload")}
                    >
                      下载全部
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleDeleteFile("uploadlist")}
                    >
                      删除全部
                    </Button>
                  </div>
                )
              }
              dataSource={myUploadList}
              renderItem={(item) => (
                <List.Item key={item.id} className="flex justify-between">
                  <span
                    className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer text-green-700"
                    onClick={() => handleDownloadFile(item)}
                  >
                    {item.originalname}
                  </span>
                  <span className="w-1/4 text-center">
                    {formatGMTTime(item.time)}
                  </span>
                  <Space>
                    <Button
                      type="default"
                      onClick={() => handleDownloadFile(item)}
                    >
                      下载
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleDeleteFile(item)}
                    >
                      删除
                    </Button>
                  </Space>
                </List.Item>
              )}
            ></List>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Spin>
  );
};

export default FileAdmin;
