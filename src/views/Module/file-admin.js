import React, { useState } from 'react';
import { 
    Spin,
    Card, 
    Tabs, 
    List, 
    Upload, 
    Space, 
    Button, 
    message 
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { formatGMTTime } from '@/utils/tools';
import { SERVER_ADDRESS } from '@/utils/config';
const { $http } = React;


function FileAdmin() {
    const [spinning, setSpinning] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadFileList, setUploadFileList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [myUploadList, setMyUploadList] = useState([]);

    const beforeUploadFile = (fileList) => {
        setUploadFileList([...uploadFileList, ...fileList]);
        return false;
    }
    const onRemoveFile = (file) => {
        const index = uploadFileList.indexOf(file);
        const newUploadFileList = uploadFileList.slice();
        newUploadFileList.splice(index, 1);
        setUploadFileList(newUploadFileList);
    }
    const handleUploadFileList = () => {
        setUploading(true);

        const formData = new FormData();
        uploadFileList.forEach(file => {
            formData.append('files', file);
        });
        $http.post('/file/uploadFileList', formData)
            .then(() => {
                setUploadFileList([]);
                message.success('上传成功');
            })
            .catch(error => {
                console.log(error);
                message.success('上传失败');
            })
            .finally(() => {
                setUploading(false);
            });
    }
    const handleGetFileList = () => {
        setSpinning(true);
        $http.get('/file/getFileList')
            .then(response => {
                const { result } = response;
                setFileList(result);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setSpinning(false);
            });
    }
    const handleGetMyUploadList = () => {
        setSpinning(true);
        $http.get('/file/getMyUploadList')
            .then(response => {
                const { result } = response;
                setMyUploadList(result);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setSpinning(false);
            });
    }
    const handleTabChange = (key) => {
        switch (key) {
            case 'filelist':
                handleGetFileList();
                break;
            case 'myupload':
                handleGetMyUploadList();
                break;
            default:
                break;
        }
    }
    const handleDownload = (type) => {
        setSpinning(true);
        switch (type) {
            case 'filelist':
                fileList.forEach(file => {
                    const name = file.name;
                    window.open(`${SERVER_ADDRESS}/${name}`);
                });
                setSpinning(false);
                break;
            case 'myupload':
                myUploadList.forEach(file => {
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
    }
    const handleDelete = (type) => {
        setSpinning(true);
        if (type === 'uploadlist') {
            const ids = myUploadList.map(file => file.id);
            const params = { ids };
            $http.delete('/file/deleteAllFile', { params })
                .then(() => {
                    setSpinning(false);
                    handleGetMyUploadList();
                    message.success('删除成功');
                })
                .catch(error => {
                    console.log(error);
                    message.error('删除失败');
                });
        } else {
            const params = { name: type.name };
            $http.delete('/file/deleteSingleFile', { params })
                .then(() => {
                    setSpinning(false);
                    handleGetMyUploadList();
                    message.success('删除成功');
                })
                .catch(error => {
                    console.log(error);
                    message.error('删除失败');
                });
        }
    }
    
    return (  
        <Spin spinning={spinning}>
            <Card title="文件管理">
                <Tabs
                    defaultActiveKey="upload"
                    onChange={(key) => handleTabChange(key)}
                >
                    <Tabs.TabPane tab="上传文件"key="upload">
                        <Upload.Dragger 
                            maxCount={10}
                            multiple={true}
                            fileList={uploadFileList}
                            beforeUpload={(_, fileList) => beforeUploadFile(fileList)}
                            onRemove={(file) => onRemoveFile(file)}
                            name="files" 
                            className="w-1/4"
                        >
                            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                            <p className="ant-upload-text">支持拖拽上传和点击上传</p>
                        </Upload.Dragger>
                        <Button
                            type="primary"
                            onClick={() => handleUploadFileList()}
                            disabled={uploadFileList.length === 0}
                            loading={uploading}
                            className="mt-4"
                        >
                            {uploading ? '上传中...' : '上传'}
                        </Button>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="文件列表" key="filelist">
                        <List
                            size="large"
                            bordered
                            footer={
                                fileList.length === 0 ?
                                ""
                                :
                                <Button type="primary" onClick={() => handleDownload('filelist')}>下载全部</Button>
                            }
                            dataSource={fileList}
                            renderItem={item => 
                                <List.Item key={item.id} className="flex justify-between">
                                    <span 
                                        className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer text-green-700"
                                        onClick={() => handleDownload(item)}
                                    >
                                        {item.originalname}
                                    </span>
                                    <span className="w-1/4 text-center">
                                        {formatGMTTime(item.time)}
                                    </span>
                                    <Space>
                                        <Button type="default" onClick={() => handleDownload(item)}>下载</Button>
                                    </Space>
                                </List.Item>}>
                        </List>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="我的上传" key="myupload">
                        <List
                            size="large"
                            bordered
                            footer={
                                myUploadList.length === 0 ?
                                ""
                                :
                                <div>
                                    <Button 
                                        className="mr-2"
                                        type="primary" 
                                        onClick={() => handleDownload('myupload')}
                                    >
                                        下载全部
                                    </Button>
                                    <Button type="danger" onClick={() => handleDelete('uploadlist')}>删除全部</Button>
                                </div>  
                            }
                            dataSource={myUploadList}
                            renderItem={item => 
                                <List.Item key={item.id} className="flex justify-between">
                                    <span 
                                        className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer text-green-700"
                                        onClick={() => handleDownload(item)}
                                    >
                                        {item.originalname}
                                    </span>
                                    <span className="w-1/4 text-center">
                                        {formatGMTTime(item.time)}
                                    </span>
                                    <Space>
                                        <Button type="default" onClick={() => handleDownload(item)}>下载</Button>
                                        <Button type="danger" onClick={() => handleDelete(item)}>删除</Button>
                                    </Space>
                                </List.Item>}
                        >
                        </List>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </Spin>
    );
}

export default FileAdmin;