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
import { useIntl } from "react-intl";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
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

type UserDataType = {
  id: number;
  username: string;
  gender: number;
  role: number;
  phone: string;
  email: string;
  avatar: string;
  time: string;
};
type GetUserType = {
  email: string;
  gender: number;
  pageNum: number;
  pageSize: number;
  phone: string;
  role: number;
  username: string;
};
type AddEditUserType = {
  id: number | undefined;
  avatar: string;
  email: string;
  gender: number;
  phone: string;
  role: number;
  username: string;
};
type DeleteUserType = {
  id: number | undefined;
};
type MultipleDeleteUserType = {
  ids: Array<number>;
};
type FileType = {
  type: string;
  size: number;
};
const UserList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userTableData, setUserTableData] = useState([]);
  const [searchForm, setSearchForm] = useState({
    username: "",
    gender: -1,
    role: 0,
    phone: "",
    email: "",
  });
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 });
  const [total, setTotal] = useState({ total: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalForm, setModalForm] = useState({
    id: undefined,
    username: "",
    gender: 0,
    role: 1,
    phone: "",
    email: "",
    avatar: "",
  });
  const [modalType, setModalType] = useState("");
  const searchRef = useRef<any>();
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const columns: Array<object> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      defaultSortOrder: "ascend",
      sorter: (a: UserDataType, b: UserDataType) => a.id - b.id,
    },
    {
      title: formatMessage("user_list.columns_username_title"),
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: formatMessage("user_list.columns_gender"),
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (text: number) => {
        return text === 0 ? (
          <span style={{ color: "#001529" }}>
            {formatMessage("user_list.columns_gender_male")}
          </span>
        ) : (
          <span style={{ color: "#3DB389" }}>
            {formatMessage("user_list.columns_gender_female")}
          </span>
        );
      },
      defaultSortOrder: "ascend",
      sorter: (a: UserDataType, b: UserDataType) => a.gender - b.gender,
    },
    {
      title: formatMessage("user_list.columns_role"),
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (text: number) => {
        switch (text) {
          case 1:
            return (
              <span style={{ color: "#000000" }}>
                {formatMessage("user_list.columns_role_user")}
              </span>
            );
          case 2:
            return (
              <span style={{ color: "#FFB800" }}>
                {formatMessage("user_list.columns_role_admin")}
              </span>
            );
          case 3:
            return (
              <span style={{ color: "#3DB327" }}>
                {formatMessage("user_list.columns_role_root")}
              </span>
            );
          default:
            break;
        }
      },
      defaultSortOrder: "ascend",
      sorter: (a: UserDataType, b: UserDataType) => a.role - b.role,
    },
    {
      title: formatMessage("user_list.columns_phone"),
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: formatMessage("user_list.columns_email"),
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: formatMessage("user_list.columns_time"),
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (text: string) => {
        return text.substring(0, 10) + " " + text.substring(11, 19);
      },
    },
    {
      title: formatMessage("user_list.columns_avatar"),
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: "100px",
      height: "100px",
      render: (text: string, record: UserDataType) => {
        return (
          <img
            src={SERVER_ADDRESS + "/" + record.avatar}
            alt={formatMessage("user_list.columns_avatar_alt")}
            className="w-20 h-20"
          />
        );
      },
    },
    {
      title: formatMessage("user_list.columns_action"),
      key: "action",
      align: "center",
      render: (text: string, record: UserDataType) => {
        return (
          <Fragment>
            <Button
              type="link"
              onClick={() => onOpenAddEditForm("edit", record)}
            >
              <EditOutlined />
              {formatMessage("user_list.columns_action_edit")}
            </Button>
            <Button type="link" onClick={() => handleSingleDeleteUser(record)}>
              <DeleteOutlined />
              {formatMessage("user_list.columns_action_delete")}
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const genderOptions = [
    { label: "user_list.options_gender_all", value: -1 },
    { label: "user_list.options_gender_male", value: 0 },
    { label: "user_list.options_gender_female", value: 1 },
  ];
  const roleOptions = [
    { label: "user_list.options_role_all", value: 0 },
    { label: "user_list.options_role_user", value: 1 },
    { label: "user_list.options_role_admin", value: 2 },
    { label: "user_list.options_role_root", value: 3 },
  ];
  const genderRadios = [
    { label: "user_list.radios_gender_male", value: 0 },
    { label: "user_list.radios_gender_female", value: 1 },
  ];
  const roleRadios = [
    { label: "user_list.radios_role_user", value: 1 },
    { label: "user_list.radios_role_admin", value: 2 },
    { label: "user_list.radios_role_root", value: 3 },
  ];
  const { loading: loadingGetUser, runAsync: runGetUser } = useRequest(
    (params: GetUserType) => getUser(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingaAddUser, runAsync: runAddUser } = useRequest(
    (params: AddEditUserType) => addUser(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingEditUser, runAsync: runEditUser } = useRequest(
    (params: AddEditUserType) => editUser(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingDeleteUser, runAsync: runDeleteUser } = useRequest(
    (params: DeleteUserType) => deleteUser(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingMultipleDelete, runAsync: runMultipleDelete } =
    useRequest((params: MultipleDeleteUserType) => multipleDelete(params), {
      manual: true,
      throttleWait: 1000,
    });

  const handleGetUserList = () => {
    const params = { ...searchForm, ...pagination };
    runGetUser(params)
      .then((response: any) => {
        const { result, total } = response;

        setUserTableData(result);
        setTotal({ total });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePageChange = (values: any) => {
    const { current, pageSize } = values;
    setPagination({ pageNum: current, pageSize });
  };
  const onOpenAddEditForm = (modalType: string, record?: any) => {
    if (record) {
      setModalForm(record);
      setAvatarUrl(record.avatar);
    } else {
      setAvatarUrl("");
      setModalForm({
        id: undefined,
        username: "",
        gender: 0,
        role: 1,
        phone: "",
        email: "",
        avatar: "",
      });
    }
    setModalType(modalType);
    setModalVisible(true);
  };
  const onSaveAddEditForm = (params: any) => {
    if (Object.prototype.toString.call(params.avatar) === "[object Object]") {
      params.avatar = params.avatar.file.response.file.path;
    }
    if (modalType === "add") {
      runAddUser(params)
        .then(() => {
          message.success(formatMessage("message.add.success"));
          handleGetUserList();
          setModalVisible(false);
        })
        .catch((error) => {
          message.error(formatMessage("message.add.error"));
          console.log(error);
        });
    } else {
      params.id = modalForm.id;
      console.log(params);

      runEditUser(params)
        .then(() => {
          message.success(formatMessage("message.edit.success"));
          handleGetUserList();
          setModalVisible(false);
        })
        .catch((error) => {
          message.error(formatMessage("message.edit.error"));
          console.log(error);
        });
    }
  };
  const handleSingleDeleteUser = (record: UserDataType) => {
    Modal.confirm({
      title: formatMessage("user_list.delete_confirm_title"),
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          {formatMessage("user_list.delete_confirm_content")}
          <span className="text-light-red">{record.username}</span>？
        </span>
      ),
      onOk: () => {
        const params = { id: record.id };
        runDeleteUser(params)
          .then(() => {
            message.success(formatMessage("message.delete.success"));
            handleGetUserList();
          })
          .catch((error) => {
            message.success(formatMessage("message.delete.error"));
            console.log(error);
          });
      },
    });
  };
  const handleMultipleDelete = () => {
    if (!selectedRowKeys.length) {
      return message.error(formatMessage("user_list.multiple_confirm_check"));
    }
    Modal.confirm({
      title: formatMessage("user_list.multiple_confirm_title"),
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>{formatMessage("user_list.multiple_confirm_content")}</span>
      ),
      onOk: () => {
        const params = { ids: selectedRowKeys };
        runMultipleDelete(params)
          .then(() => {
            message.success(formatMessage("message.delete.success"));
            handleGetUserList();
          })
          .catch((error) => {
            message.error(formatMessage("message.delete.error"));
            console.log(error);
          });
      },
    });
  };
  const handleBeforeUpload = (file: FileType) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error(formatMessage("user_list.before_upload_type"));
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error(formatMessage("user_list.before_upload_size"));
      return false;
    }
    return true;
  };
  const handleAvatarChange = (avatar: any) => {
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
  useEffect(() => {
    handleGetUserList();
  }, [searchForm, pagination]);

  return (
    <Spin
      spinning={
        loadingGetUser ||
        loadingaAddUser ||
        loadingEditUser ||
        loadingDeleteUser ||
        loadingMultipleDelete
      }
    >
      <Card title={formatMessage("user_list.title")}>
        <Form
          name="search"
          ref={searchRef}
          className="ant-advanced-search-form"
          onFinish={setSearchForm}
        >
          <Row gutter={24}>
            <Col span={3}>
              <Form.Item
                name="username"
                label={formatMessage("user_list.label_username")}
              >
                <Input
                  placeholder={formatMessage("user_list.placeholder_username")}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                name="gender"
                label={formatMessage("user_list.label_gender")}
              >
                <Select placeholder={formatMessage("user_list.initial_gender")}>
                  {genderOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {formatMessage(option.label)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                name="role"
                label={formatMessage("user_list.label_role")}
              >
                <Select placeholder={formatMessage("user_list.initial_role")}>
                  {roleOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {formatMessage(option.label)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="phone"
                label={formatMessage("user_list.label_phone")}
              >
                <Input
                  placeholder={formatMessage("user_list.placeholder_phone")}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="email"
                label={formatMessage("user_list.label_email")}
              >
                <Input
                  placeholder={formatMessage("user_list.placeholder_email")}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {formatMessage("user_list.button_search")}
                </Button>
                <Button onClick={() => searchRef.current.resetFields()}>
                  {formatMessage("user_list.button_reset")}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Space className="mb-4">
          <Button type="primary" onClick={() => onOpenAddEditForm("add")}>
            <PlusOutlined />
            {formatMessage("user_list.button_add")}
          </Button>
          <Button type="primary" onClick={handleMultipleDelete}>
            <DeleteOutlined />
            {formatMessage("user_list.button_multiple_delete")}
          </Button>
        </Space>
        <Table
          bordered={true}
          rowSelection={{ selectedRowKeys, onChange: (values: any) => setSelectedRowKeys(values) }}
          columns={columns}
          dataSource={userTableData}
          pagination={{ ...pagination, ...total }}
          onChange={handlePageChange}
          rowKey={(record: any) => `${record.id}`}
        />
        <Modal
          title={
            modalType === "add"
              ? formatMessage("user_list.modal_add_user")
              : formatMessage("user_list.modal_edit_user")
          }
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
              label={formatMessage("user_list.modal_username")}
              name="username"
              rules={[
                {
                  required: true,
                  message: formatMessage("user_list.modal_rules_username"),
                },
              ]}
            >
              <Input
                placeholder={formatMessage("user_list.modal_rules_username")}
              />
            </Form.Item>
            <Form.Item
              label={formatMessage("user_list.modal_input_gender")}
              name="gender"
            >
              <Radio.Group>
                {genderRadios.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {formatMessage(option.label)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={formatMessage("user_list.modal_input_role")}
              name="role"
            >
              <Radio.Group>
                {roleRadios.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {formatMessage(option.label)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={formatMessage("user_list.modal_input_avatar")}
              name="avatar"
              valuePropName="avatar"
            >
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
                    alt={formatMessage("user_list.modal_img_alt")}
                    className="w-full h-full"
                  />
                ) : (
                  <Uploading uploading={uploading} />
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label={formatMessage("user_list.modal_label_phone")}
              name="phone"
              rules={[
                {
                  pattern: PhoneRegexp,
                  message: formatMessage("user_list.modal_rules_phone"),
                },
              ]}
            >
              <Input
                placeholder={formatMessage("user_list.modal_input_phone")}
              />
            </Form.Item>
            <Form.Item
              label={formatMessage("user_list.modal_label_email")}
              name="email"
              rules={[
                {
                  pattern: EmailRegexp,
                  message: formatMessage("user_list.modal_rules_email"),
                },
              ]}
            >
              <Input
                placeholder={formatMessage("user_list.modal_input_email")}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {formatMessage("user_list.modal_input_submit")}
                </Button>
                <Button type="default" onClick={() => setModalVisible(false)}>
                  {formatMessage("user_list.modal_button_cancel")}
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
