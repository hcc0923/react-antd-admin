import React, { Component } from 'react';
import { Layout, Avatar, Dropdown, Menu, Button } from "antd";
import { 
    SettingOutlined,
    DownOutlined
} from "@ant-design/icons";
import { withRouter } from 'react-router-dom';
import FullScreen from '@/components/FullScreen';
import BasicDrawer from '@/components/BasicDrawer';
import { SERVER_ADDRESS } from '@/utils/config';



class TopHeader extends Component {
    state = {
        visible: false
    };
    handleOpenSetting = () => {
        this.setState({ visible: true });
    };
    handleCloseSetting = () => {
		this.setState({ visible: false });
    };
    handleChangeTheme = checked => {
        this.props.setTheme({ type: checked ? 'dark' : 'light' });
		this.handleCloseSetting();
    };
    handleChangeBreadCrumb = checked => {
        this.props.setBreadcrumb({ show: checked });
        this.handleCloseSetting();
    };
    handleChangeTag = checked => {
        this.props.setTag({ show: checked });
        this.handleCloseSetting();
    };
    handleMenuClick = (item) => {
        const { key } = item;
        if (key === 'logout') {
            localStorage.clear();
            this.props.history.push('/login');
        } else {
            this.props.history.push(`/${item.key}`);
        };
    };
    render() { 
        const { theme, breadcrumb, tag, userInfo } = this.props;
        const userDropdownMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="basic-info">基本资料</Menu.Item>
                <Menu.Item key="modify-password">修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        );
        return (  
            <Layout.Header 
                className="site-layout-background w-screen fixed z-50" 
                theme={theme.type}>
                <div className="flex justify-end">
                    <div className="flex justify-between items-center">
                        <div className="text-white mr-4">
                            <FullScreen></FullScreen>
                        </div>
                        <div className="text-white mr-4">
                            <SettingOutlined onClick={this.handleOpenSetting}></SettingOutlined>
                        </div>
                        <div>
                            <Avatar src={userInfo.avatar === '' ? '' : SERVER_ADDRESS + '/' + userInfo.avatar}></Avatar>
                            <Dropdown 
                                overlay={userDropdownMenu}
                                trigger="['click']">
                                <Button className="text-white" type="link">
                                    {userInfo.username}<DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                {/* 设置 */}
                <BasicDrawer
                    title="系统设置"
                    closable
                    visible={this.state.visible}
                    theme={theme}
                    breadcrumb={breadcrumb}
                    tag={tag}
                    onClose={this.handleCloseSetting} 
                    onChangeTheme={this.handleChangeTheme}
                    onChangeBreadCrumb={this.handleChangeBreadCrumb}
                    onChangeTag={this.handleChangeTag}>
                </BasicDrawer>
            </Layout.Header>
        );
    };
};
export default withRouter(TopHeader);