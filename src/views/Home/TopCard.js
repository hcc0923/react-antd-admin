import React from 'react';
import { 
    Card, 
    Row, 
    Col, 
    Tag, 
    Space 
} from "antd";
import { 
    FlagOutlined, 
    UploadOutlined,
    DownloadOutlined,
    UserOutlined
} from "@ant-design/icons";
import PropTypes from 'prop-types';
import { formatAmount } from "@/utils/tools";


function TopCard(props) {
    const { topCard } = props;
    
    return (  
        <Row gutter={16} className="mb-6">
        {
            topCard.map((item, index) => {
                return (
                    <Col span={6} key={index}>
                        <Card 
                            title={item.title}
                            hoverable="true"
                            extra={<Tag color={item.color}>{item.smallName}</Tag>}>
                            <p className="mt-2 mb-6">{formatAmount(item.number)}</p>
                            <Row justify="space-between">
                                <Col span={12} className="text-left">
                                    <span>{item.bigName}</span>
                                </Col>
                                <Col span={12} className="text-right">
                                    <Space>
                                        <span>{item.numName}</span>
                                        <span>
                                        {
                                            index === 0 ? 
                                            <FlagOutlined /> 
                                            : 
                                            index === 1 ? 
                                            <UploadOutlined /> 
                                            : 
                                            index === 2 ? 
                                            <DownloadOutlined /> : <UserOutlined />
                                        }
                                        </span>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                );
            })
        }
        </Row>
    );
}

TopCard.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    smallName: PropTypes.string,
    number: PropTypes.number,
    bigName: PropTypes.string,
    numName: PropTypes.string,
    icon: PropTypes.object,
};

export default TopCard;