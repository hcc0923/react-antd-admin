import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';


class BreadCrumb extends Component {
    state = {};
    render() { 
        const { breadCrumb } = this.props;
        return (  
            <Breadcrumb style={{marginTop: "14px"}}>
                {
                    breadCrumb.map(item => <Breadcrumb.Item key={item.key}>{item.value}</Breadcrumb.Item>)
                }
            </Breadcrumb>
        );
    };
};
export default withRouter(BreadCrumb);