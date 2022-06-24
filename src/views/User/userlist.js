import React, { Component } from 'react';
import { Card, Form, Input, Row, Col, Space, Button, Table, Select, Modal, Radio, Upload, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { SERVER_ADDRESS } from '@/utils/config';
import Uploading from '@/components/Uploading';
import "./userlist.less";


const { $http } = React;
const Options = [
    { label: '不限', value: -1 },
    { label: '男', value: 0 },
    { label: '女', value: 1 }
];
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PhoneRegexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
class UserList extends Component {
    state = {
        selectedRowKeys: [],
        Loading: false,
        uploading: false,
        avatarUrl: '',
        userTableData: [],
        query: {
            username: '',
            gender: -1,
            phone: '',
            email: ''
        },
        pagination: {
            pageNum: 1,
            pageSize: 10,
            total: 0
        },
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.id - b.id
            },
            {
                title: '姓名',
                dataIndex: 'username',
                key: 'username',
                align: 'center'
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        text === 0 ?
                        <span style={{color: '#001529'}}>男</span> : <span style={{color: '#3DB389'}}>女</span>
                    )
                },
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.gender - b.gender
            },
            {
                title: '手机号码',
                dataIndex: 'phone',
                key: 'phone',
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                align: 'center'
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        text.substring(0, 10) + ' ' + text.substring(11, 19)
                    )
                }
            },
            {
                title: '头像',
                dataIndex: 'avatar',
                key: 'avatar',
                align: 'center',
                width: '100px',
                height: '100px',
                render: (text, record, index) => {
                    return (
                        <React.Fragment>
                            <img src={SERVER_ADDRESS + '/' + record.avatar} alt="获取头像失败" style={{ width: '80px', height: '80px'}} />
                        </React.Fragment>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <React.Fragment>
                            <Button type="link" onClick={() => this.onEdit(record)}><EditOutlined />编辑</Button>
                            <Button type="link" onClick={() => this.onDelete(record)}><DeleteOutlined />删除</Button>
                        </React.Fragment>
                    )
                }
            }
        ],
        modalVisible: false,
        modalForm: {
            username: '',
            gender: 0,
            phone: '',
            email: '',
            avatar: ''
        },
        modalType: 'add'
    };
    searchRef = React.createRef();
    modalRef = React.createRef();
    getUserList = () => {
        const { query, pagination } = this.state;
        const params = {};
        for (const key in query) {
            params[key] = query[key];
        };
        for (const key in pagination) {
            if (key !=='total') {
                params[key] = pagination[key];
            };
        };
        $http.get('/user/getUser', {params})
            .then((response) => {
                const { result, total } = response;
                this.setState({
                    Loading: false,
                    userTableData: result,
                    pagination: { 
                        pageNum: pagination.pageNum,
                        pageSize: pagination.pageSize,
                        total
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    handleSearch = (values) => {
        this.setState({ query: values }, () => {
            this.getUserList();
        });
    }; 
    resetSearch = () => {
        this.searchRef.current.resetFields();
        this.getUserList();
    };
    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        this.setState({
            pagination: {pageNum: current, pageSize}
        }, () => {
            this.getUserList();
        });
    };
    openAddEditModal = (modalType, record) => {
        if (record) {
            this.setState({
                modalVisible: true,
                modalForm: record,
                modalType
            });
        } else {
            this.setState({
                modalVisible: true,
                modalForm: {
                    username: '',
                    gender: 0,
                    phone: '',
                    email: '',
                    avatar: '',
                },
                modalType
            }, () => {
                // ref 引用问题
                setTimeout(() => {
                    this.modalRef.current.setFieldsValue({
                        username: '',
                        gender: 0,
                        phone: '',
                        email: '',
                        avatar: '',
                    });
                });
            });
        };
    };
    handleAddModalCancel = () => {
        this.modalRef.current.resetFields();
        this.setState({
            modalVisible: false,
            modalType: 'add'
        });
    };
    onSaveAddEditForm = (values) => {
        values.avatar = values.avatar.file.response.file.path;
        const { modalForm, modalType } = this.state;
        if (modalType === 'add') {
            $http.post('/user/addUser', values)
                .then(() => {
                    message.success('创建成功');
                    this.getUserList();
                    this.handleAddModalCancel();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            values.id = modalForm.id;
            $http.put('/user/editUser', values)
                .then(() => {
                    message.success('编辑成功');
                    this.getUserList();
                    this.handleAddModalCancel();
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    };
    onEdit = (record) => {
        this.setState({
            modalVisible: true,
            modalForm: record,
            modalType: 'edit'
        }, () => {
            // ref 引用问题
            setTimeout(() => {
                this.modalRef.current.setFieldsValue({
                    id: record.id,
                    username: record.username,
                    gender: record.gender,
                    phone: record.phone,
                    email: record.email,
                    avatar: record.avatar
                });
            });
        });
    };
    onDelete = (record) => {
        Modal.confirm({
            title: '删除用户',
            icon: <ExclamationCircleOutlined />,
            content: (<span>确认删除用户<span className="text-light-red">{record.username}</span>吗？</span>),
            onOk: () => {
                const params = {id: record.id};
                $http.delete('/user/deleteUser', {params})
                    .then(() => {
                        message.success('删除成功');
                        this.getUserList();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    onMultipleDelete = () => {
        const { selectedRowKeys } = this.state;
        if (!selectedRowKeys.length) {
            return message.error('请先选择删除的用户！');
        }
        Modal.confirm({
            title: '批量删除',
            icon: <ExclamationCircleOutlined />,
            content: (<span>确认删除这些用户吗？</span>),
            onOk: () => {
                const params = { ids: selectedRowKeys };
                $http.delete('/user/multipleDelete', {params})
                    .then(() => {
                        message.success('删除成功');
                        this.getUserList();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };
    handleBeforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG/PNG文件!');
        };
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        };
        return isJpgOrPng && isLt2M;
    };
    handleAvatarChange = info => {
        this.setState({uploading: true});
        const file = info.file;

        if (file.status === 'uploading') {
            return this.setState({uploading: true});
        };
        if (file.status === 'done') {
            const path = file.response.file.path;
            this.setState({avatarUrl: path});
            return this.setState({uploading: false});
        };
        if (file.status === 'error') {
            message.error('上传失败');
            return this.setState({uploading: false});
        };
    };
    componentDidMount() {
        this.setState({Loading: true});
        this.getUserList();
    };
    render() { 
        const { Loading, selectedRowKeys, userTableData, columns, pagination, modalVisible, modalType, modalForm, avatarUrl, uploading  } = this.state;
        const rowSelection = { selectedRowKeys, onChange: this.onSelectChange };
        return (  
            <Card title="用户列表">
                <Form
                    name="search"
                    ref={this.searchRef}
                    className="ant-advanced-search-form"
                    onFinish={this.handleSearch}>
                        <Row
                            gutter={24}>
                            <Col span={5}>
                                <Form.Item name="username" label="姓名">
                                    <Input placeholder="请输入姓名"></Input>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="gender" label="性别">
                                    <Select initialvalue="不限">
                                        {
                                            Options.map(option => (
                                                <Select.Option
                                                    key={option.value}
                                                    value={option.value}
                                                >{option.label}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="phone" label="手机号码">
                                    <Input placeholder="请输入手机号码"></Input>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="email" label="邮箱">
                                    <Input placeholder="请输入邮箱"></Input>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Space>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                    <Button onClick={() => this.searchRef.current.resetFields()}>重置</Button>
                                </Space>
                            </Col>
                        </Row>
                </Form>
                <Space className="add_delete">
                    <Button type="primary" onClick={() => this.openAddEditModal('add')}><PlusOutlined />添加</Button>
                    <Button type="primary" onClick={this.onMultipleDelete}><DeleteOutlined />批量删除</Button>
                </Space>
                <div className="user_list">
                    <Table 
                        bordered={true}
                        loading={Loading}
                        rowSelection={rowSelection} 
                        columns={columns}
                        dataSource={userTableData} 
                        pagination={pagination}
                        onChange={this.handlePageChange}
                        rowKey={(record) => `${record.id}`}/>
                            <Modal
                                title={modalType === 'add' ? '创建用户' : '编辑用户'}
                                visible={modalVisible}
                                footer={null}
                                onOk={this.onSaveAddEditForm}
                                onCancel={this.handleAddModalCancel}>
                                    <Form
                                        {...layout}
                                        name="add-edit"
                                        ref={this.modalRef}
                                        initialValues={modalForm}
                                        onFinish={this.onSaveAddEditForm}>
                                            <Form.Item label="用户名" name="username" rules={[{required: true, message: '请输入用户名'}]}>
                                                <Input placeholder="请输入用户名" />
                                            </Form.Item>
                                            <Form.Item label="性别" name="gender">
                                                <Radio.Group>
                                                    <Radio value={0}>男</Radio>
                                                    <Radio value={1}>女</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item 
                                                label="头像"
                                                name="avatar"
                                                valuePropName="avatar">
                                                    <Upload
                                                        name="avatar"
                                                        listType="picture-card"
                                                        showUploadList={false}
                                                        action={SERVER_ADDRESS + '/file/uploadAvatar'}
                                                        beforeUpload={this.handleBeforeUpload}
                                                        onChange={this.handleAvatarChange}>
                                                            {avatarUrl ? <img src={SERVER_ADDRESS + '/' + avatarUrl} alt="获取头像失败" style={{ width: '100%' }} /> : <Uploading uploading={uploading}/>}
                                                    </Upload>
                                            </Form.Item>
                                            <Form.Item label="手机号码" name="phone" rules={[{pattern: PhoneRegexp, message: '手机号码格式不正确'}]}>
                                                <Input placeholder="请输入手机号码" />
                                            </Form.Item>
                                            <Form.Item label="邮箱" name="email" rules={[{pattern: EmailRegexp, message: '邮箱格式不正确'}]}>
                                                <Input placeholder="请输入邮箱" />
                                            </Form.Item>
                                            <Form.Item {...tailLayout}>
                                                <Space>
                                                    <Button type='primary' htmlType="submit">确定</Button>
                                                    <Button type="button" onClick={this.handleAddModalCancel}>取消</Button>
                                                </Space>
                                            </Form.Item>
                                    </Form>
                            </Modal>
                </div>
            </Card>
        );
    };
};
export default UserList;