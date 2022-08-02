import React, { Fragment }from 'react';
import { Card, Table, Tag } from "antd";
import { 
    FundProjectionScreenOutlined,
    HistoryOutlined,
    FieldTimeOutlined
} from "@ant-design/icons";


const FooterTable = (props) => {
    const { title, dataSource } = props;
    const tableColumns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '任务名',
          dataIndex: 'taskName',
          key: 'taskName',
          render: (text) => {
            return (
              <Fragment>
                <FundProjectionScreenOutlined className="text-base" />
                <span className="text-base ml-2">{text}</span>
              </Fragment>
            );
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          render: (text) => {
            return (
              <Fragment>
                <HistoryOutlined className="text-base" />
                <span className="text-base ml-2">{text}</span>
              </Fragment>
            );
          }
        },
        {
          title: '任务时间',
          dataIndex: 'taskTime',
          key: 'taskTime',
          render: (text) => {
            return (
              <Fragment>
                <FieldTimeOutlined className="text-base" />
                <span className="text-base ml-2">{text}</span>
              </Fragment>
            );
          }
        },
        {
          title: '完成状态',
          dataIndex: 'taskStatus',
          key: 'taskStatus',
          render: (text, record) => {
            const status = record.taskStatus;
            switch (status) {
              case 0:
                return <Tag color="#1890ff">未开始</Tag>;
              case 1:
                return <Tag color="#1DA57A">进行中</Tag>;
              case 2:
                return <Tag color="#FFB801">已完成</Tag>;
              default:
                break;
            };
          }
        }
    ];
    
    return (
        <Card 
            title={title} 
        >
            <Table
                columns={tableColumns}
                dataSource={dataSource}
                pagination={false}
            />
        </Card>
    );
};

export default FooterTable;