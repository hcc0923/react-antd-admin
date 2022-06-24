import React, { Component }from 'react';
import { Card, Row, Col, Tag, Space } from "antd";
import PropTypes from 'prop-types';
import { formatAmount } from "@/utils/formatTool";


class DataCard extends Component {
    state = {};
    render() { 
        const { title, color, smallName, number, bigName, numName, icon  } = this.props;
        return (  
            <Card 
                title={title}
                hoverable="true"
                extra={<Tag color={color}>{smallName}</Tag>}>
                    <p className="count">{formatAmount(number)}</p>
                    <Row justify="space-between">
                        <Col span={12} className="left">
                            <span>{bigName}</span>
                        </Col>
                        <Col span={12} className="right">
                            <Space>
                                <span>{numName}</span>
                                <span>
                                    {icon}
                                </span>
                            </Space>
                        </Col>
                    </Row>
            </Card>
        );
    };
};
DataCard.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    smallName: PropTypes.string,
    number: PropTypes.number,
    bigName: PropTypes.string,
    numName: PropTypes.string,
    icon: PropTypes.object,
};
export default DataCard;