import React from 'react';
import { Card, Table } from "antd";


function TableCard(props) {
    return (
        <Card title={props.title} extra={<span>上次登陆时间：{props.lastLoginTime}</span>}>
            <Table
                columns={props.columns}
                dataSource={props.dataSource}
                pagination={false}
            ></Table>
        </Card>
    );
};
export default TableCard;