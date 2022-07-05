import React, { useState, useEffect, useRef } from 'react';
import { 
    Card, 
    Form, 
    Input, 
    Row, 
    Col, 
    Space, 
    Button, 
    Table, 
    Select, 
    Modal,
    Radio, 
    Upload, 
    message 
} from "antd";
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    ExclamationCircleOutlined 
} from '@ant-design/icons';
import { SERVER_ADDRESS } from '@/utils/config';
import Uploading from '@/components/Uploading';


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

function UserList() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userTableData, setUserTableData] = useState([]);
    const [searchForm, setSearchForm] = useState({ username: '', gender: -1, phone: '', email: '' });
    const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 });
    const [total, setTotal] = useState({ total: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalForm, setModalForm] = useState({ username: '', gender: 0, phone: '', email: '', avatar: '' });
    const [modalType, setModalType] = useState();
    const searchRef = useRef();
    
    const getUserList = () => {
        const params = {};
        for (const key in searchForm) {
            params[key] = searchForm[key];
        }
        for (const key in pagination) {
            if (key !=='total') {
                params[key] = pagination[key];
            }
        }
        setLoading(true);
        $http.get('/user/getUser', {params})
            .then((response) => {
                const { result, total } = response;

                setLoading(false);
                setUserTableData(result);
                setTotal({ total });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handlePageChange = (values) => {
        const { current, pageSize } = values;
        setPagination({ pageNum: current, pageSize })
    }
    const openAddEditModal = (modalType, record) => {
        if (record) {
            setModalForm(record);
            setAvatarUrl(record.avatar);
        } else {
            setAvatarUrl('');
            setModalForm({ username: '', gender: 0, phone: '', email: '', avatar: '' });
        }
        setModalType(modalType);
        setModalVisible(true);
    }
    const handleCancelModal = () => {
        setModalVisible(false);
    }
    const onSaveAddEditForm = (values) => {
        values.avatar = values.avatar.file.response.file.path;
        if (modalType === 'add') {
            $http.post('/user/addUser', values)
                .then(() => {
                    message.success('创建成功');
                    getUserList();
                    handleCancelModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            values.id = modalForm.id;
            $http.put('/user/editUser', values)
                .then(() => {
                    message.success('编辑成功');
                    getUserList();
                    handleCancelModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    const onDelete = (record) => {
        Modal.confirm({
            title: '删除用户',
            icon: <ExclamationCircleOutlined />,
            content: (<span>确认删除用户<span className="text-light-red">{record.username}</span>吗？</span>),
            onOk: () => {
                const params = { id: record.id };
                $http.delete('/user/deleteUser', {params})
                    .then(() => {
                        message.success('删除成功');
                        getUserList();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    }
    const onMultipleDelete = () => {
        if (!selectedRowKeys.length) return message.error('请先选择删除的用户！');
        Modal.confirm({
            title: '批量删除',
            icon: <ExclamationCircleOutlined />,
            content: (<span>确认删除这些用户吗？</span>),
            onOk: () => {
                const params = { ids: selectedRowKeys };
                $http.delete('/user/multipleDelete', {params})
                    .then(() => {
                        message.success('删除成功');
                        getUserList();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }
    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) message.error('只能上传JPG/PNG文件!');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) message.error('图片大小不能超过2MB!');
        return isJpgOrPng && isLt2M;
    }
    const handleAvatarChange = (info) => {
        setUploading(true);
        const file = info.file;

        if (file.status === 'uploading') {
            return setUploading(true);
        }
        if (file.status === 'done') {
            const path = file.response.file.path;
            setAvatarUrl(path);
            return setUploading(false);
        }
        if (file.status === 'error') {
            message.error('上传失败');
            return setUploading(false);
        }
    }
    const columns = [
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
                        <Button type="link" onClick={() => openAddEditModal('edit', record)}><EditOutlined />编辑</Button>
                        <Button type="link" onClick={() => onDelete(record)}><DeleteOutlined />删除</Button>
                    </React.Fragment>
                )
            }
        }
    ];
    useEffect(() => {
        getUserList();
    }, [searchForm, pagination]);
    const rowSelection = { selectedRowKeys, onChange: onSelectChange };
    return (  
            <Card title="用户列表">
                <Form
                    name="search"
                    ref={searchRef}
                    className="ant-advanced-search-form"
                    onFinish={(values) => setSearchForm(values)}>
                        <Row
                            gutter={24}>
                            <Col span={5}>
                                <Form.Item name="username" label="姓名">
                                    <Input placeholder="请输入姓名" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="gender" label="性别">
                                    <Select initialvalue="不限">
                                        {
                                            Options.map(option => (
                                                <Select.Option
                                                    key={option.value}
                                                    value={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="phone" label="手机号码">
                                    <Input placeholder="请输入手机号码" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="email" label="邮箱">
                                    <Input placeholder="请输入邮箱" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Space>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                    <Button onClick={() => searchRef.current.resetFields()}>重置</Button>
                                </Space>
                            </Col>
                        </Row>
                </Form>
                <Space className="mb-4">
                    <Button type="primary" onClick={() => openAddEditModal('add')}><PlusOutlined />添加</Button>
                    <Button type="primary" onClick={() => onMultipleDelete()}><DeleteOutlined />批量删除</Button>
                </Space>
                <Table 
                    bordered={true}
                    loading={loading}
                    rowSelection={rowSelection} 
                    columns={columns}
                    dataSource={userTableData} 
                    pagination={{...pagination, ...total}}
                    onChange={(values) => handlePageChange(values)}
                    rowKey={(record) => `${record.id}`} />
                <Modal
                    title={modalType === 'add' ? '创建用户' : '编辑用户'}
                    visible={modalVisible}
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => handleCancelModal()}>
                        <Form
                            {...layout}
                            name="add-edit"
                            initialValues={modalForm}
                            onFinish={(values) => onSaveAddEditForm(values)}>
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
                                            beforeUpload={(file) => handleBeforeUpload(file)}
                                            onChange={(info) => handleAvatarChange(info)}>
                                                {
                                                    avatarUrl ? 
                                                    <img src={SERVER_ADDRESS + '/' + avatarUrl} alt="获取头像失败" className="w-full" /> 
                                                    : 
                                                    <Uploading uploading={uploading}/>
                                                }
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
                                        <Button type="button" onClick={() => handleCancelModal()}>取消</Button>
                                    </Space>
                                </Form.Item>
                        </Form>
                </Modal>
            </Card>
    );
}

export default UserList;