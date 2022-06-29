import React, { Component, useState } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { setCollapse, setTheme } from '@/store/actions/setting';
import TopHeader from "./TopHeader";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import BottomFooter from "./BottomFooter";


import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';


const { Header, Sider, Content } = Layout;
class LayoutContainer extends Component {
    state = { visible: false, collapsed: false };
    render() { 
        // 父组件向子组件分发数据和方法
        const { collapse, theme, userInfo } = this.props;
        const { setCollapse, setTheme } = this.props;

        return (
            // <Layout>
            //     <TopHeader
            //         theme={theme}
            //         setTheme={setTheme}
            //         userInfo={userInfo}
            //     />
            //     <SideMenu
            //         theme={theme}
            //         collapse={collapse}
            //         userInfo={userInfo}
            //         setCollapse={setCollapse}
            //     />
            //     {/* ml-28 */}
            //     <Layout className="site-layout ml-56 mt-24">
            //         <MainContent renderRoutes={this.props.route.routes} />
            //         <BottomFooter />
            //     </Layout>
            // </Layout>
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                    ]}
                />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                        padding: 0,
                        }}
                    >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => this.setState({ collapsed: !this.state.collapsed}),
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
          </Layout>
        );
    };
};


const mapStateToProps = (state) => state;
const mapDispatchToProps = dispatch => ({
	setCollapse: data => {
		dispatch(setCollapse(data));
	},
	setTheme: data => {
		dispatch(setTheme(data));
	}
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);




