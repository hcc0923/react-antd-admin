import React from 'react';
import { Card, Table, Tag } from 'antd';
import { 
    FundOutlined
} from "@ant-design/icons";


class DataTable extends React.Component {
    state = {
        columns: [
            {
                title: '地区',
                dataIndex: 'childStatistic',
                key: 'childStatistic',
                align: 'center'
            },
            {
                title: '累计确诊',
                dataIndex: 'totalConfirmed',
                key: 'totalConfirmed',
                align: 'center',
                render: text => <span style={{color: '#E25552'}}>{text}</span>
            },
            {
                title: '累计治愈',
                dataIndex: 'totalCured',
                key: 'totalCured',
                align: 'center',
                render: text => <span style={{color: '#87d068'}}>{text}</span>
            },
            {
                title: '累计死亡',
                dataIndex: 'totalDeath',
                key: 'totalDeath',
                align: 'center',
                render: text => <span style={{color: '#831A26'}}>{text}</span>
            }
        ]
    };
    render() {
        const { columns } = this.state;
        return (
            <Card
                title={<FundOutlined style={{color: '#1DA57A', fontSize: '20px'}}/>}
                extra={<Tag color="#009688">疫情表格</Tag>}>
                    <Table 
                        bordered={true}
                        columns={columns} 
                        dataSource={this.props.tableData}
                        rowKey={(record) => `${record.childStatistic}`}
                        pagination={false} />
            </Card>
        );
    };
};


export default DataTable;