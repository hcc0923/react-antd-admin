import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import Logo from './Logo/index';
import Menu from './Menu/index';
import { setCollapse } from "@/store/actions/setting";
const { Sider } = Layout;

function LayoutSider(props) {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapseSider = (collapsed) => {
        setCollapsed(collapsed)
        props.setCollapse({ collapsed });
    }
    return (
        <Sider
            theme={"dark"}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapseSider}
            style={{ overflow: 'auto', height: '100vh',zIndex: 100 }}
        >
            <Logo />
            <Menu />
        </Sider>
    )
}


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setCollapse: data => {
        dispatch(setCollapse(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSider);
