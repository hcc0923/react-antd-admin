import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Spin,
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
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Uploading from "@/components/Uploading";
import {
  getUser,
  addUser,
  editUser,
  deleteUser,
  multipleDelete,
} from "@/api/user";
import { EmailRegexp, PhoneRegexp } from "@/utils";
import { SERVER_ADDRESS } from "@/utils/config";

const Options = [
  { label: "不限", value: -1 },
  { label: "男", value: 0 },
  { label: "女", value: 1 },
];
const UserList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userTableData, setUserTableData] = useState([]);
  const [searchForm, setSearchForm] = useState({
    username: "",
    gender: -1,
    phone: "",
    email: "",
  });
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 });
  const [total, setTotal] = useState({ total: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalForm, setModalForm] = useState({
    username: "",
    gender: 0,
    phone: "",
    email: "",
    avatar: "",
  });
  const [modalType, setModalType] = useState();
  const searchRef = useRef();

  const handleGetUserList = () => {
    setSpinning(true);
    const params = {};
    for (const key in searchForm) {
      params[key] = searchForm[key];
    }
    for (const key in pagination) {
      if (key !== "total") {
        params[key] = pagination[key];
      }
    }
    getUser(params)
      .then((response) => {
        const { result, total } = response;

        setUserTableData(result);
        setTotal({ total });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSpinning(false);
      });
  };
  const handlePageChange = (values) => {
    const { current, pageSize } = values;
    setPagination({ pageNum: current, pageSize });
  };
  const onOpenAddEditForm = (modalType, record) => {
    if (record) {
      setModalForm(record);
      setAvatarUrl(record.avatar);
    } else {
      setAvatarUrl("");
      setModalForm({
        username: "",
        gender: 0,
        phone: "",
        email: "",
        avatar: "",
      });
    }
    setModalType(modalType);
    setModalVisible(true);
  };
  const onSaveAddEditForm = (values) => {
    if (Object.prototype.toString.call(values.avatar) === "[object Object]") {
      values.avatar = values.avatar.file.response.file.path;
    }
    setSpinning(true);
    if (modalType === "add") {
      addUser(values)
        .then(() => {
          message.success("添加成功");
          handleGetUserList();
          setModalVisible(false);
        })
        .catch((error) => {
          message.error("添加失败");
          console.log(error);
        })
        .finally(() => {
          setSpinning(false);
        });
    } else {
      values.id = modalForm.id;
      editUser(values)
        .then(() => {
          message.success("编辑成功");
          handleGetUserList();
          setModalVisible(false);
        })
        .catch((error) => {
          message.error("编辑失败");
          console.log(error);
        })
        .finally(() => {
          setSpinning(false);
        });
    }
  };
  const handleSingleDeleteUser = (record) => {
    Modal.confirm({
      title: "删除用户",
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          确认删除用户<span className="text-light-red">{record.username}</span>
          吗？
        </span>
      ),
      onOk: () => {
        setSpinning(true);
        const params = { id: record.id };
        deleteUser(params)
          .then(() => {
            message.success("删除成功");
            handleGetUserList();
          })
          .catch((error) => {
            message.error("删除失败");
            console.log(error);
          })
          .finally(() => {
            setSpinning(false);
          });
      },
    });
  };
  const handleMultipleDelete = () => {
    if (!selectedRowKeys.length) return message.error("请先选择要删除的用户！");
    Modal.confirm({
      title: "批量删除",
      icon: <ExclamationCircleOutlined />,
      content: <span>确认删除这些用户吗？</span>,
      onOk: () => {
        setSpinning(true);
        const params = { ids: selectedRowKeys };
        multipleDelete(params)
          .then(() => {
            message.success("删除成功");
            handleGetUserList();
          })
          .catch((error) => {
            message.error("删除失败");
            console.log(error);
          })
          .finally(() => {
            setSpinning(false);
          });
      },
    });
  };
  const handleBeforeUpload = (file) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error("只能上传JPG/PNG文件!");
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error("图片大小不能超过2MB!");
      return false;
    }
    return true;
  };
  const handleAvatarChange = (avatar) => {
    setUploading(true);
    const { file } = avatar;
    const { status } = file;
    switch (status) {
      case "uploading":
        return setUploading(true);
      case "done":
        const { path } = file.response.file;
        setAvatarUrl(path);
        return setUploading(false);
      case "error":
        return setUploading(false);
      default:
        break;
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "姓名",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (text) => {
        return text === 0 ? (
          <span style={{ color: "#001529" }}>男</span>
        ) : (
          <span style={{ color: "#3DB389" }}>女</span>
        );
      },
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.gender - b.gender,
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (text) => {
        return text.substring(0, 10) + " " + text.substring(11, 19);
      },
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: "100px",
      height: "100px",
      render: (text, record, index) => {
        return (
          <img
            src={SERVER_ADDRESS + "/" + record.avatar}
            alt="获取头像失败"
            className="w-20 h-20"
          />
        );
      },
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (text, record, index) => {
        return (
          <Fragment>
            <Button
              type="link"
              onClick={() => onOpenAddEditForm("edit", record)}
            >
              <EditOutlined />
              编辑
            </Button>
            <Button type="link" onClick={() => handleSingleDeleteUser(record)}>
              <DeleteOutlined />
              删除
            </Button>
          </Fragment>
        );
      },
    },
  ];
  useEffect(() => {
    handleGetUserList();
  }, [searchForm, pagination]);

  return (
    <Spin spinning={spinning}>
      <Card title="用户列表">
        <Form
          name="search"
          ref={searchRef}
          className="ant-advanced-search-form"
          onFinish={setSearchForm}
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item name="username" label="姓名">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="gender" label="性别">
                <Select initialvalue="不限">
                  {Options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
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
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={() => searchRef.current.resetFields()}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Space className="mb-4">
          <Button type="primary" onClick={() => onOpenAddEditForm("add")}>
            <PlusOutlined />
            添加
          </Button>
          <Button type="primary" onClick={handleMultipleDelete}>
            <DeleteOutlined />
            批量删除
          </Button>
        </Space>
        <Table
          bordered={true}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          columns={columns}
          dataSource={userTableData}
          pagination={{ ...pagination, ...total }}
          onChange={handlePageChange}
          rowKey={(record) => `${record.id}`}
        />
        <Modal
          title={modalType === "add" ? "创建用户" : "编辑用户"}
          visible={modalVisible}
          footer={null}
          destroyOnClose={true}
          onCancel={() => setModalVisible(false)}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="add-edit"
            initialValues={modalForm}
            onFinish={onSaveAddEditForm}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="性别" name="gender">
              <Radio.Group>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="头像" name="avatar" valuePropName="avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action={SERVER_ADDRESS + "/file/uploadAvatar"}
                beforeUpload={handleBeforeUpload}
                onChange={handleAvatarChange}
              >
                {avatarUrl ? (
                  <img
                    src={SERVER_ADDRESS + "/" + avatarUrl}
                    alt="获取头像失败"
                    className="w-full h-full"
                  />
                ) : (
                  <Uploading uploading={uploading} />
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label="手机号码"
              name="phone"
              rules={[
                {
                  pattern: PhoneRegexp,
                  message: "手机号码格式不正确",
                },
              ]}
            >
              <Input placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  pattern: EmailRegexp,
                  message: "邮箱格式不正确",
                },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                <Button type="button" onClick={() => setModalVisible(false)}>
                  取消
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </Spin>
  );
};

export default UserList;
