import React, { Component } from 'react';
import { Card, Tabs, List, Upload, Space, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { formatGMTTime } from '@/utils/formatTool';
import { SERVER_ADDRESS } from '@/utils/config';
const { $http } = React;


class File extends Component {
    state = {
        uploading: false,
        uploadFileList: [],
        fileList: [],
        myUploadList: []
    };
    handleTabChange = key => {
        switch (key) {
            case 'filelist':
                this.handleGetFileList();
                break;
            case 'myupload':
                this.handleGetMyUploadList();
                break;
            default:
                break;
        };
    };
    handleUploadFileList = () => {
        const { uploadFileList } = this.state;
        const formData = new FormData();
        uploadFileList.forEach(file => {
            formData.append('files', file);
        });

        this.setState({uploading: true});
        $http.post('/file/uploadFileList', formData)
            .then(() => {
                this.setState({
                    uploading: false,
                    uploadFileList: []
                });
                message.success('上传成功');
            })
            .catch(error => {
                console.log(error);
                message.success('上传失败');
            });
    };
    handleGetFileList = () => {
        this.setState({loading: true});
        $http.get('/file/getFileList')
            .then(response => {
                const { result } = response;
                this.setState({
                    loading: false, 
                    fileList: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleGetMyUploadList = () => {
        this.setState({loading: true});
        $http.get('/file/getMyUploadList')
            .then(response => {
                const { result } = response;
                this.setState({
                    loading: false, 
                    myUploadList: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleDownload = type => {
        switch (type) {
            case 'filelist':
                this.setState({loading: true});
                this.state.fileList.forEach(file => {
                    const name = file.name;
                    window.open(`${SERVER_ADDRESS}/${name}`);
                });
                this.setState({loading: false});
                break;
            case 'myupload':
                this.setState({loading: true});
                this.state.myUploadList.forEach(file => {
                    const name = file.name;
                    window.open(`${SERVER_ADDRESS}/${name}`);
                });
                this.setState({loading: false});
                break;
            default:
                this.setState({loading: true});
                window.open(`${SERVER_ADDRESS}/${type.name}`);
                this.setState({loading: false});
                break;
        };
    };
    handleDelete = type => {
        if (type === 'uploadlist') {
            const ids = this.state.myUploadList.map(file => file.id);
            const params = { ids };
            
            console.log(params);
            $http.delete('/file/deleteAllFile', {params})
                .then(() => {
                    message.success('删除成功');
                    this.handleGetMyUploadList();
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            const params = {name: type.name};
            $http.delete('/file/deleteSingleFile', {params})
                .then(() => {
                    message.success('删除成功');
                    this.handleGetMyUploadList();
                })
                .catch(error => {
                    console.log(error);
                });
        };
    };
    render() { 
        const { uploading, uploadFileList, fileList, myUploadList } = this.state;
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.uploadFileList.indexOf(file);
                    const newUploadFileList = state.uploadFileList.slice();
                    newUploadFileList.splice(index, 1);
                    return {
                        uploadFileList: newUploadFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    uploadFileList: [...state.uploadFileList, file],
                }));
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
            <Card title="防疫文件资源共享中心">
                <Tabs
                    defaultActiveKey="upload"
                    onChange={this.handleTabChange}>
                        <Tabs.TabPane
                            tab="上传文件"
                            key="upload">
                                <section>
                                    <Upload.Dragger {...uploadProps} name="files" style={{width: '280px'}}>
                                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                        <p className="ant-upload-text">支持拖拽上传和点击上传</p>
                                    </Upload.Dragger>
                                </section>
                                <section>
                                    <Button
                                        type="primary"
                                        onClick={this.handleUploadFileList}
                                        disabled={uploadFileList.length === 0}
                                        loading={uploading}
                                        style={{ marginTop: 16 }}>
                                        {uploading ? '上传中...' : '上传'}
                                    </Button>
                                </section>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab="文件列表"
                            key="filelist">
                                <List
                                    size="large"
                                    bordered
                                    footer={
                                        fileList.length === 0 ?
                                        ""
                                        :
                                        <Button type="primary" onClick={() => this.handleDownload('filelist')}>下载全部</Button>
                                    }
                                    dataSource={fileList}
                                    renderItem={item => 
                                        <List.Item key={item.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <span style={{flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', cursor: 'pointer', color: '#1DA57A'}} onClick={() => this.handleDownload(item)}>
                                                {item.originalname}
                                            </span>
                                            <span style={{width: '20%', textAlign: 'center'}}>
                                                {formatGMTTime(item.time)}
                                            </span>
                                            <Space>
                                                <Button type="default" onClick={() => this.handleDownload(item)}>下载</Button>
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
                                            <Button type="primary" onClick={() => this.handleDownload('myupload')} style={{marginRight: '8px'}}>下载全部</Button>
                                            <Button type="danger" onClick={() => this.handleDelete('uploadlist')}>删除全部</Button>
                                        </div>  
                                    }
                                    dataSource={myUploadList}
                                    renderItem={item => 
                                        <List.Item key={item.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <span style={{flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', cursor: 'pointer', color: '#1DA57A'}} onClick={() => this.handleDownload(item)}>
                                                {item.originalname}
                                            </span>
                                            <span style={{width: '20%', textAlign: 'center'}}>
                                                {formatGMTTime(item.time)}
                                            </span>
                                            <Space>
                                                <Button type="default" onClick={() => this.handleDownload(item)}>下载</Button>
                                                <Button type="danger" onClick={() => this.handleDelete(item)}>删除</Button>
                                            </Space>
                                        </List.Item>}>
                                </List>
                        </Tabs.TabPane>
                </Tabs>
            </Card>
        );
    };
};


export default File;