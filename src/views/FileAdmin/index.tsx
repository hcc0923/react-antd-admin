import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Tabs, List, Upload, Space, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { formatGMTTime } from "@/utils";
import { SERVER_ADDRESS } from "@/utils/config";
import SpinCard from "@/components/SpinCard";
import {
  uploadMultipleFile,
  getAllFileList,
  getMyUploadList,
  deleteSingleFile,
  deleteAllFile,
} from "@/api/file";

type FileType = {
  id: number;
  name: string;
  original: string;
  time: string;
};
type DeleteFileType = {
  id: number;
  name: string;
};
type MultipleDeleteFileType = {
  deleteParams: Array<DeleteFileType>;
};
const FileAdmin = () => {
  const [spinning, setSpinning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFileList, setUploadFileList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [myUploadList, setMyUploadList] = useState([]);
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const { loading: loadingMultipleFile, runAsync: runUploadMultipleFile } =
    useRequest((params: object) => uploadMultipleFile(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingGetAllFileList, runAsync: runGetAllFileList } =
    useRequest(getAllFileList, { manual: true, throttleWait: 1000 });
  const { loading: loadingGetMyUploadList, runAsync: runGetMyUploadList } =
    useRequest(getMyUploadList, { manual: true, throttleWait: 1000 });
  const { loading: loadingDeleteSingleFile, runAsync: runDeleteSingleFile } =
    useRequest((params: DeleteFileType) => deleteSingleFile(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingDeleteAllFile, runAsync: runDeleteAllFile } =
    useRequest((params: MultipleDeleteFileType) => deleteAllFile(params), {
      manual: true,
      throttleWait: 1000,
    });

  const handleBeforeUploadFile = (fileList: Array<object>) => {
    const uploadFileListData: any = [...uploadFileList, ...fileList];
    setUploadFileList(uploadFileListData);
    return false;
  };
  const handleRemoveFile = (file: any) => {
    const index = uploadFileList.findIndex(
      (item: any) => item.uid === file.uid
    );
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
        message.success(formatMessage("file_admin.upload_success"));
      })
      .catch((error) => {
        console.log(error);
        message.error(formatMessage("file_admin.upload_error"));
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const handleGetAllFileList = () => {
    runGetAllFileList()
      .then((response: any) => {
        const { result } = response;
        setFileList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetMyUploadFileList = () => {
    runGetMyUploadList()
      .then((response: any) => {
        const { result } = response;
        setMyUploadList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTabChange = (key: string) => {
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
  const handleDownloadFile = (type: string | FileType) => {
    setSpinning(true);
    if (type === "filelist") {
      fileList.forEach((file: FileType) => {
        const name = file.name;
        window.open(`${SERVER_ADDRESS}/${name}`);
      });
      setSpinning(false);
    } else if (type === "myupload") {
      myUploadList.forEach((file: FileType) => {
        const name = file.name;
        window.open(`${SERVER_ADDRESS}/${name}`);
      });
      setSpinning(false);
    } else if (typeof type === "object") {
      window.open(`${SERVER_ADDRESS}/${type.name}`);
      setSpinning(false);
    }
  };
  const handleDeleteFile = (data: string | FileType) => {
    if (data === "uploadlist") {
      const deleteParams = myUploadList.map((file: FileType) => {
        return {
          id: file.id,
          name: file.name,
        };
      });
      const params = { deleteParams };
      runDeleteAllFile(params)
        .then(() => {
          handleGetMyUploadFileList();
          message.success(formatMessage("message.delete.success"));
        })
        .catch((error) => {
          console.log(error);
          message.error(formatMessage("message.delete.error"));
        });
    } else if (typeof data === "object") {
      const params = { id: data.id, name: data.name };
      runDeleteSingleFile(params)
        .then(() => {
          handleGetMyUploadFileList();
          message.success(formatMessage("message.delete.success"));
        })
        .catch((error) => {
          console.log(error);
          message.error(formatMessage("message.delete.error"));
        });
    }
  };
  return (
    <SpinCard
      spinning={
        loadingMultipleFile ||
        loadingGetAllFileList ||
        loadingGetMyUploadList ||
        loadingDeleteSingleFile ||
        loadingDeleteAllFile ||
        spinning
      }
      title={formatMessage("file_admin.title")}
    >
      <Tabs defaultActiveKey="upload" onChange={handleTabChange}>
        <Tabs.TabPane
          tab={formatMessage("file_admin.upload_tab")}
          key="upload"
        >
          <Upload.Dragger
            maxCount={5}
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
            <p className="ant-upload-text">
              {formatMessage("file_admin.upload_text")}
            </p>
          </Upload.Dragger>
          <Button
            type="primary"
            onClick={handleUploadFileList}
            disabled={uploadFileList.length === 0}
            loading={uploading}
            className="mt-4"
          >
            {uploading
              ? formatMessage("file_admin.upload_uploading")
              : formatMessage("file_admin.upload_upload")}
          </Button>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={formatMessage("file_admin.filelist_tab")}
          key="filelist"
        >
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
                  {formatMessage(
                    "file_admin.filelist_button_download_all"
                  )}
                </Button>
              )
            }
            dataSource={fileList}
            pagination={{ pageSize: 8 }}
            renderItem={(item: any) => (
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
                    {formatMessage("file_admin.filelist_button_download")}
                  </Button>
                </Space>
              </List.Item>
            )}
          ></List>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={formatMessage("file_admin.myupload_tab")}
          key="myupload"
        >
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
                    {formatMessage(
                      "file_admin.myupload_button_download_all"
                    )}
                  </Button>
                  <Button
                    type="primary"
                    danger={true}
                    onClick={() => handleDeleteFile("uploadlist")}
                  >
                    {formatMessage(
                      "file_admin.myupload_button_delete_all"
                    )}
                  </Button>
                </div>
              )
            }
            dataSource={myUploadList}
            pagination={{ pageSize: 8 }}
            renderItem={(item: any) => (
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
                    {formatMessage(
                      "file_admin.myupload_button_download_file"
                    )}
                  </Button>
                  <Button
                    type="primary"
                    danger={true}
                    onClick={() => handleDeleteFile(item)}
                  >
                    {formatMessage(
                      "file_admin.myupload_button_delete_file"
                    )}
                  </Button>
                </Space>
              </List.Item>
            )}
          ></List>
        </Tabs.TabPane>
      </Tabs>
    </SpinCard>
  );
};

export default FileAdmin;
