import React from "react";
import { Card, Table, Tag } from "antd";


const FooterTable = (props) => {
  const { title, dataSource } = props;
  const tableColumns = [
    {
      align: "center",
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "任务名",
      dataIndex: "taskName",
      key: "taskName",
      render: (text) => {
        return (
            <span className="text-base">{text}</span>
        );
      },
    },
    {
      align: "center",
      title: "状态",
      dataIndex: "taskLevel",
      key: "taskLevel",
      render: (text, record) => {
        const level = record.taskLevel;
        switch (level) {
          case 1:
            return <Tag color="#FFD111">普通</Tag>
          case 2:
            return <Tag color="#1890ff">重要</Tag>;
          case 3:
            return <Tag color="#1DA57A">紧急</Tag>;
          default:
            break;
        }
      },
    },
  ];

  return (
    <Card title={title}>
      <Table
        bordered={true}
        columns={tableColumns}
        dataSource={dataSource}
        pagination={false}
      />
    </Card>
  );
};

export default FooterTable;
