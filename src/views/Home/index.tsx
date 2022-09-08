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
import { getTask, addTask, editTask, deleteTask } from "@/api/task";

type GetTaskType = {
  pageNum: number;
  pageSize: number;
  tasklevel: number;
  taskname: string;
};
type TaskDataType = {
  id: number | undefined;
  tasklevel: string;
  taskname: string;
};
type DeleteTaskType = {
  id: number | undefined;
};
const TaskList = () => {
  const [taskTableData, setTaskTableData] = useState([]);
  const [searchForm, setSearchForm] = useState({
    taskname: "",
    tasklevel: 0,
  });
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 });
  const [total, setTotal] = useState({ total: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalForm, setModalForm] = useState({
    id: undefined,
    taskname: "",
    tasklevel: "0",
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
      sorter: (a: TaskDataType, b: TaskDataType) => Number(a.id) - Number(b.id),
    },
    {
      title: formatMessage("home.columns.taskname"),
      dataIndex: "taskname",
      key: "taskname",
      align: "center",
    },
    {
      title: formatMessage("home.columns.tasklevel"),
      dataIndex: "tasklevel",
      key: "tasklevel",
      align: "center",
      render: (text: string): any => {
        switch (text) {
          case "1":
            return (
              <span style={{ color: "#000000" }}>
                {formatMessage("home.columns.common")}
              </span>
            );
          case "2":
            return (
              <span style={{ color: "#FFB800" }}>
                {formatMessage("home.columns.important")}
              </span>
            );
          case "3":
            return (
              <span style={{ color: "#3DB327" }}>
                {formatMessage("home.columns.urgent")}
              </span>
            );
          default:
            break;
        }
      },
      defaultSortOrder: "ascend",
      sorter: (a: TaskDataType, b: TaskDataType) =>
        Number(a.tasklevel) - Number(b.tasklevel),
    },
    {
      title: formatMessage("home.columns.action"),
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text: string, record: TaskDataType) => {
        return (
          <Fragment>
            <Button
              type="link"
              onClick={() => onOpenAddEditForm("edit", record)}
            >
              <EditOutlined />
              {formatMessage("home.columns.edit")}
            </Button>
            <Button type="link" onClick={() => handleDeleteTask(record)}>
              <DeleteOutlined />
              {formatMessage("home.columns.delete")}
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const taskLevelOptions = [
    { label: "home.options_task_level_all", value: -1 },
    { label: "home.options_task_level_common", value: 1 },
    { label: "home.options_task_level_important", value: 2 },
    { label: "home.options_task_level_urgent", value: 3 },
  ];
  const taskLevelRadios = [
    { label: "home.radios_task_level_common", value: "1" },
    { label: "home.radios_task_level_important", value: "2" },
    { label: "home.radios_task_level_urgent", value: "3" },
  ];
  const { loading: loadingGetTask, runAsync: runGetTask } = useRequest(
    (params: GetTaskType) => getTask(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingAddTask, runAsync: runAddTask } = useRequest(
    (params: TaskDataType) => addTask(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingEditTask, runAsync: runEditTask } = useRequest(
    (params: TaskDataType) => editTask(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingDeleteTask, runAsync: runDeleteTask } = useRequest(
    (params: DeleteTaskType) => deleteTask(params),
    { manual: true, throttleWait: 1000 }
  );

  const handleGetTaskList = () => {
    const params = { ...searchForm, ...pagination };
    runGetTask(params)
      .then((response: any) => {
        const { result, total } = response;
        setTaskTableData(result);
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
    } else {
      setModalForm({
        id: undefined,
        taskname: "",
        tasklevel: "1",
      });
    }
    setModalType(modalType);
    setModalVisible(true);
  };
  const onSaveAddEditForm = (values: TaskDataType) => {
    if (modalType === "add") {
      runAddTask(values)
        .then(() => {
          message.success(formatMessage("message.add.success"));
          handleGetTaskList();
          setModalVisible(false);
        })
        .catch((error) => {
          message.error(formatMessage("message.add.error"));
          console.log(error);
        });
    } else {
      values.id = modalForm.id;
      runEditTask(values)
        .then(() => {
          message.success(formatMessage("message.edit.success"));
          handleGetTaskList();
          setModalVisible(false);
        })
        .catch((error) => {
          message.error(formatMessage("message.edit.error"));
          console.log(error);
        });
    }
  };
  const handleDeleteTask = (record: TaskDataType) => {
    Modal.confirm({
      title: formatMessage("home.delete_confirm_title"),
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          {formatMessage("home.delete_confirm_content")}
          <span className="text-light-red">{record.taskname}</span>？
        </span>
      ),
      onOk: () => {
        const params = { id: record.id };
        runDeleteTask(params)
          .then(() => {
            message.success(formatMessage("message.delete.success"));
            handleGetTaskList();
          })
          .catch((error) => {
            message.success(formatMessage("message.delete.error"));
            console.log(error);
          });
      },
    });
  };
  useEffect(() => {
    handleGetTaskList();
  }, [searchForm, pagination]);

  return (
    <Spin
      spinning={
        loadingGetTask || loadingAddTask || loadingEditTask || loadingDeleteTask
      }
    >
      <Card title={formatMessage("home.title")}>
        <Form
          name="search"
          ref={searchRef}
          className="ant-advanced-search-form"
          onFinish={setSearchForm}
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item
                name="taskname"
                label={formatMessage("home.label_taskname")}
              >
                <Input
                  placeholder={formatMessage("home.placeholder_taskname")}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="tasklevel"
                label={formatMessage("home.label_tasklevel")}
              >
                <Select placeholder={formatMessage("home.initial_tasklevel")}>
                  {taskLevelOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {formatMessage(option.label)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {formatMessage("home.button_search")}
                </Button>
                <Button onClick={() => searchRef.current.resetFields()}>
                  {formatMessage("home.button_reset")}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Space className="mb-4">
          <Button type="primary" onClick={() => onOpenAddEditForm("add")}>
            <PlusOutlined />
            {formatMessage("home.button_add")}
          </Button>
        </Space>
        <Table
          bordered={true}
          columns={columns}
          dataSource={taskTableData}
          pagination={{ ...pagination, ...total }}
          onChange={handlePageChange}
          rowKey={(record: any) => `${record.id}`}
        />
        <Modal
          title={
            modalType === "add"
              ? formatMessage("home.modal_add_task")
              : formatMessage("home.modal_edit_task")
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
              label={formatMessage("home.modal_taskname")}
              name="taskname"
              rules={[
                {
                  required: true,
                  message: formatMessage("home.modal_rules_taskname"),
                },
              ]}
            >
              <Input placeholder={formatMessage("home.modal_rules_taskname")} />
            </Form.Item>
            <Form.Item
              label={formatMessage("home.modal_label_tasklevel")}
              name="tasklevel"
            >
              <Radio.Group>
                {taskLevelRadios.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {formatMessage(option.label)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {formatMessage("home.modal_button_submit")}
                </Button>
                <Button type="default" onClick={() => setModalVisible(false)}>
                  {formatMessage("home.modal_button_cancel")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </Spin>
  );
};

export default TaskList;
