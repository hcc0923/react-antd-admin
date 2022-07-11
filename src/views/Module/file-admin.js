import React, { useState } from 'react';
import { 
    Card, 
    Tabs, 
    List, 
    Upload, 
    Space, 
    Button, 
    message 
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { formatGMTTime } from '@/utils/formatTool';
import { SERVER_ADDRESS } from '@/utils/config';
const { $http } = React;


function FileAdmin() {
    const [uploading, setUploading] = useState(false);
    const [uploadFileList, setUploadFileList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [myUploadList, setMyUploadList] = useState([]);

    const handleGetFileList = () => {
        setUploading(true);
        $http.get('/file/getFileList')
            .then(response => {
                const { result } = response;
                setUploading(false);
                setFileList(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleGetMyUploadList = () => {
        setUploading(true);
        $http.get('/file/getMyUploadList')
            .then(response => {
                const { result } = response;
                setUploading(false);
                setMyUploadList(result);
            })
            .catch(error => {
                console.log(error);
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
    const handleUploadFileList = () => {
        const formData = new FormData();
        uploadFileList.forEach(file => {
            formData.append('files', file);
        });

        setUploading(true);
        $http.post('/file/uploadFileList', formData)
            .then(() => {
                setUploading(false);
                setUploadFileList([]);
                message.success('上传成功');
            })
            .catch(error => {
                console.log(error);
                message.success('上传失败');
            });
    }
    const handleDownload = (type) => {
        switch (type) {
            case 'filelist':
                setUploading(true);
                fileList.forEach(file => {
                    const name = file.name;
                    window.open(`${SERVER_ADDRESS}/${name}`);
                });
                setUploading(false);
                break;
            case 'myupload':
                setUploading(true);
                myUploadList.forEach(file => {
                    const name = file.name;
                    window.open(`${SERVER_ADDRESS}/${name}`);
                });
                setUploading(false);
                break;
            default:
                setUploading(true);
                window.open(`${SERVER_ADDRESS}/${type.name}`);
                setUploading(false);
                break;
        }
    }
    const handleDelete = (type) => {
        if (type === 'uploadlist') {
            const ids = myUploadList.map(file => file.id);
            const params = { ids };
            
            $http.delete('/file/deleteAllFile', { params })
                .then(() => {
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
                    handleGetMyUploadList();
                    message.success('删除成功');
                })
                .catch(error => {
                    console.log(error);
                    message.error('删除失败');
                });
        }
    }
    const uploadProps = {
        onRemove: file => {
            const index = uploadFileList.indexOf(file);
            const newUploadFileList = uploadFileList.slice();
            newUploadFileList.splice(index, 1);
            setUploadFileList(newUploadFileList);
        },
        beforeUpload: file => {
            setUploadFileList([...uploadFileList, file]);
            return false;
        },
        multiple: true,
        progress: {
            strokeColor: {
                '0%': '#87d068',
                '100%': '#1DA57A',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        uploadFileList
    };
    
    return (  
        <Card title="文件管理">
            <Tabs
                defaultActiveKey="upload"
                onChange={(key) => handleTabChange(key)}>
                    <Tabs.TabPane tab="上传文件"key="upload">
                        <Upload.Dragger {...uploadProps} name="files" className="w-1/4">
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
                    <Tabs.TabPane
                        tab="我的上传"
                        key="myupload">
                            <List
                                size="large"
                                bordered
                                footer={
                                    myUploadList.length === 0 ?
                                    ""
                                    :
                                    <div>
                                        <Button type="primary" onClick={() => handleDownload('myupload')} className="mr-2">下载全部</Button>
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
                                    </List.Item>}>
                            </List>
                    </Tabs.TabPane>
            </Tabs>
        </Card>
    );
}

export default FileAdmin;