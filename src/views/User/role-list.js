import React, { useEffect, useState, useRef, Fragment } from 'react';
import { 
    Card, 
    Table, 
    Row, 
    Col, 
    Form, 
    Modal, 
    Space, 
    Button, 
    Select, 
    Radio, 
    Input, 
    Spin,
    message 
} from 'antd';
import { 
    EditOutlined, 
    DeleteOutlined,
    ExclamationCircleOutlined 
} from '@ant-design/icons';


const { $http } = React;
const Options = [
    { label: '不限', value: 0 },
    { label: '用户', value: 1 },
    { label: '管理员', value: 2 },
    { label: '超级管理员', value: 3 }
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

function RoleList() {
    const [spinning, setSpinning] = useState(false);
    const [userTableData, setUserTableData] = useState([]);
    const [searchForm, setSearchForm] = useState({ id: 0, username: '', role: 0 });
    const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 });
    const [total, setTotal] = useState({ total: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalForm, setModalForm] = useState({ id: 0, username: '', role: 1 });
    const searchRef = useRef();

    const getRoleList = () => {
        const params = {};
        for (const key in searchForm) {
            params[key] = searchForm[key];
        }
        for (const key in pagination) {
            if (key !== 'total') {
                params[key] = pagination[key];
            }
        }
        setSpinning(true);
        $http.get('/user/getRole', {params})
            .then(response => {
                const { result, total } = response;
                
                setUserTableData(result);
                setTotal({ total });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setSpinning(false);
            });
    }
    const handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        setPagination({ pageNum: current, pageSize });
    }
    const onEdit = (record) => {
        setModalForm(record);
        setModalVisible(true);
    }
    const onSaveEditForm = (values) => {
        setSpinning(true);
        $http.put('/user/editRole', values)
            .then(() => {
                setSpinning(false);
                message.success('编辑成功');
                getRoleList();
                setModalVisible(false);
            })
            .catch(error => {
                message.error('编辑失败');
                console.log(error);
            });
    }
    const onDelete = (record) => {
        Modal.confirm({
            title: '删除用户',
            icon: <ExclamationCircleOutlined />,
            content: (<span>确认删除用户<span className="text-light-red">{record.username}</span>吗？</span>),
            onOk: () => {
                setSpinning(true);
                const params = {id: record.id};
                $http.delete('/user/deleteUser', {params})
                    .then(() => {
                        setSpinning(false);
                        message.success('删除成功');
                        getRoleList();
                    })
                    .catch(error => {
                        message.error('删除失败');
                        console.log(error);
                    });
            }
        });
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
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            render: (text) => {
                switch (text) {
                    case 1:
                        return <span style={{color: '#000000'}}>用户</span>;
                    case 2:
                        return <span style={{color: '#FFB800'}}>管理员</span>;
                    case 3:
                        return <span style={{color: '#3DB327'}}>超级管理员</span>;
                    default:
                        break;
                }
            },
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.role - b.role
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                return (
                    <Fragment>
                        <Button type="link" onClick={() => onEdit(record)}><EditOutlined />编辑</Button>
                        <Button type="link" onClick={() => onDelete(record)}><DeleteOutlined />删除</Button>
                    </Fragment>
                )
            }
        }
    ]
    useEffect(() => {
        getRoleList();
    }, [searchForm, pagination]);
    return (  
        <Spin spinning={spinning}>
            <Card title="角色列表">
                <Form
                    name="search"
                    ref={searchRef}
                    className="ant-advanced-search-form"
                    onFinish={(values) => setSearchForm(values)}>
                        <Row
                            gutter={24}>
                            <Col span={5}>
                                <Form.Item name="id" label="ID">
                                    <Input placeholder="请输入ID" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="username" label="姓名">
                                    <Input placeholder="请输入姓名" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="role" label="角色">
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
                            <Col span={4}>
                                <Space>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                    <Button onClick={() => searchRef.current.resetFields()}>重置</Button>
                                </Space>
                            </Col>
                        </Row>
                </Form>
                <Table
                    bordered
                    columns={columns}
                    dataSource={userTableData}
                    pagination={{...pagination,...total}}
                    onChange={(pagination) => handlePageChange(pagination)}
                    rowKey={(record) => `${record.id}`} />
                        <Modal
                            title="修改角色"
                            visible={modalVisible}
                            footer={null}
                            destroyOnClose={true}
                            onCancel={() => setModalVisible(false)}>
                                <Form
                                    {...layout}
                                    name="edit"
                                    initialValues={modalForm}
                                    onFinish={(values) => onSaveEditForm(values)}>
                                    <Form.Item label="ID" name="id">
                                        <Input readOnly />
                                    </Form.Item>
                                    <Form.Item label="用户名" name="username">
                                        <Input readOnly />
                                    </Form.Item>
                                    <Form.Item label="角色" name="role">
                                        <Radio.Group>
                                            <Radio value={1}>用户</Radio>
                                            <Radio value={2}>管理员</Radio>
                                            <Radio value={3}>超级管理员</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Space>
                                            <Button type="primary" htmlType="submit">确定</Button>
                                            <Button type="button" onClick={() => setModalVisible(false)}>取消</Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                        </Modal>
            </Card>
        </Spin>
    );
}

export default RoleList;