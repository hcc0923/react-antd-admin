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
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getTask, addTask, editTask, deleteTask } from "@/api/task";

const Options = [
  { label: "不限", value: 0 },
  { label: "一般", value: 1 },
  { label: "重要", value: 2 },
  { label: "紧急", value: 3 },
];
const TaskList = () => {
  const [spinning, setSpinning] = useState(false);
  const [taskTableData, setTaskTableData] = useState([]);
  const [searchForm, setSearchForm] = useState({
    taskname: "",
    tasklevel: 0,
  });
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10 });
  const [total, setTotal] = useState({ total: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalForm, setModalForm] = useState({
    taskname: "",
    tasklevel: 0,
  });
  const [modalType, setModalType] = useState();
  const searchRef = useRef();

  const handleGetTaskList = () => {
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
    getTask(params)
      .then((response) => {
        const { result, total } = response;

        setTaskTableData(result);
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
    } else {
      setModalForm({
        taskname: "",
        tasklevel: 0,
      });
    }
    setModalType(modalType);
    setModalVisible(true);
  };
  const onSaveAddEditForm = (values) => {
    setSpinning(true);
    if (modalType === "add") {
      addTask(values)
        .then(() => {
          message.success("添加成功");
          handleGetTaskList();
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
      editTask(values)
        .then(() => {
          message.success("编辑成功");
          handleGetTaskList();
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
  const handleDeleteTask = (record) => {
    Modal.confirm({
      title: "删除任务",
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          确认删除任务<span className="text-light-red">{record.taskname}</span>
          吗？
        </span>
      ),
      onOk: () => {
        setSpinning(true);
        const params = { id: record.id };
        deleteTask(params)
          .then(() => {
            message.success("删除成功");
            handleGetTaskList();
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
      title: "任务名",
      dataIndex: "taskname",
      key: "taskname",
      align: "center",
    },
    {
      title: "优先级",
      dataIndex: "tasklevel",
      key: "tasklevel",
      align: "center",
      render: (text) => {
        switch (text) {
          case 1:
            return <span style={{ color: "#000000" }}>一般</span>;
          case 2:
            return <span style={{ color: "#FFB800" }}>重要</span>;
          case 3:
            return <span style={{ color: "#3DB327" }}>紧急</span>;
          default:
            break;
        }
      },
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.tasklevel - b.tasklevel,
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
            <Button type="link" onClick={() => handleDeleteTask(record)}>
              <DeleteOutlined />
              删除
            </Button>
          </Fragment>
        );
      },
    },
  ];
  useEffect(() => {
    handleGetTaskList();
  }, [searchForm, pagination]);

  return (
    <Spin spinning={spinning}>
      <Card title="任务列表">
        <Form
          name="search"
          ref={searchRef}
          className="ant-advanced-search-form"
          onFinish={setSearchForm}
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item name="taskname" label="任务名">
                <Input placeholder="请输入任务名" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="tasklevel" label="优先级">
                <Select initialvalue="不限">
                  {Options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
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
        </Space>
        <Table
          bordered={true}
          columns={columns}
          dataSource={taskTableData}
          pagination={{ ...pagination, ...total }}
          onChange={handlePageChange}
          rowKey={(record) => `${record.id}`}
        />
        <Modal
          title={modalType === "add" ? "创建任务" : "编辑任务"}
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
              label="任务名"
              name="taskname"
              rules={[
                {
                  required: true,
                  message: "请输入任务名",
                },
              ]}
            >
              <Input placeholder="请输入任务名" />
            </Form.Item>
            <Form.Item label="优先级" name="tasklevel">
              <Radio.Group>
                <Radio value={1}>一般</Radio>
                <Radio value={2}>重要</Radio>
                <Radio value={3}>紧急</Radio>
              </Radio.Group>
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

export default TaskList;
