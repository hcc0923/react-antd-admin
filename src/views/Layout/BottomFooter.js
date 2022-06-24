import React, { Component } from 'react';
import { Layout } from "antd";


class BottomFooter extends Component {
    state = {};
    render() { 
        return (  
            <Layout.Footer 
                style={{ textAlign: 'center' }}>
                系统由 React+Node+Ant Desgin驱动
            </Layout.Footer>
        );
    };
};
export default BottomFooter;