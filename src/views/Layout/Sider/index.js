import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import Logo from './Logo/index';
import Menu from './Menu/index';
const { Sider } = Layout;

function LayoutSider() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider
            theme={"dark"}
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            style={{ overflow: 'auto', height: '100vh' }}
        >
            <Logo />
            <Menu />
        </Sider>
    )
}

export default LayoutSider;