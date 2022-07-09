import React from 'react';
import { Descriptions } from 'antd';


function PageContainerContent() {
    return (
        <Descriptions size="small" column={2}>
            <Descriptions.Item label="项目">React-Antd-Admin</Descriptions.Item>
            <Descriptions.Item label="创建人">Chang Chang Han</Descriptions.Item>
            <Descriptions.Item label="联系方式">hcc960923@gmail.com</Descriptions.Item>
            <Descriptions.Item label="创建时间">2022-06-20</Descriptions.Item>
            <Descriptions.Item label="完成时间">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
        </Descriptions>
    );
}

export default PageContainerContent;