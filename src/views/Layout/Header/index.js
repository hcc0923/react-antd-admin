import React, { useState, useEffect} from 'react';
import { 
    Avatar, 
    Button, 
    Dropdown, 
    Menu,
    Space,
    Drawer,
    Switch,
    message,
    Layout
} from 'antd';
import { 
    DownOutlined, 
    SettingOutlined, 
    TranslationOutlined, 
    CheckOutlined, 
    CloseOutlined 
} from '@ant-design/icons';
import { connect } from 'react-redux';
import FullScreen from '@/components/FullScreen';
import { SERVER_ADDRESS } from '@/utils/config';
import { setOpenKeys } from "@/store/actions/setting";
import "./index.less";
import Hamburger from '@/components/Hamburger';
import BreadCrumb from '@/components/BreadCrumb';
const { Header } = Layout;


function LayoutHeader(props) {
    const { userInfo, collapse } = props;
    const [fixedHeader, setFixedHeader] = useState(false);
    const [visible, setVisible] = useState(false);
    const onLogout = () => {
        localStorage.clear();
        message.success('退出成功，请重新登录');
    }
    const onClickSetting = () => {
        setVisible(true);
    }
    const onCloseDrawer = () => {
        setVisible(false);
    }
    const onSwitchChange = (checked) => {
        setFixedHeader(checked);
    }
    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a href="#/setting-menu/user-setting/basic-info">
                  基本资料
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a href="#/setting-menu/user-setting/modify-password">
                  修改密码
                </a>
              ),
            },
            {
              type: 'divider',
            },
            {
              key: '3',
              label: (
                <a href='/' onClick={() => onLogout()}>
                  退出
                </a>
              ),
            },
          ]}
        />
    );
    const computedStyle = () => {
        let styles;
        if (fixedHeader) {
          if (collapse.collapsed) {
            styles = {
              width: "calc(100% - 80px)",
            };
          } else {
            styles = {
              width: "calc(100% - 200px)",
            };
          }
        } else {
          styles = {
            width: "100%",
          };
        }
        return styles;
    };
    return (
        <>
            {fixedHeader ? <Header /> : null}
            <Header 
                style={computedStyle()}
                className={fixedHeader ? "fixed top-0 right-0 z-10" : ""}
            >
              <div className="flex justify-between w-full">
                <Hamburger />
                <BreadCrumb />
                <div className={"h-16 flex justify-end items-center mr-4"}>
                    <div className="h-full flex justify-between items-center text-2xl">
                    
                        <FullScreen />
                        <TranslationOutlined className="ml-4" />
                        <SettingOutlined className="mx-4 cursor-default" onClick={() =>onClickSetting()} />
                    </div>
                    <div className="h-full flex justify-between items-center">
                        <Avatar src={`${SERVER_ADDRESS}/${userInfo.avatar}`} />
                        <Dropdown overlay={menu} placement="bottom" arrow>
                            <Button type="link">
                                <span className="text-lg">{userInfo.username}</span>
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                        
                    </div>
                    <Drawer 
                        title="系统设置" 
                        closeIcon={<></>}
                        placement="right" 
                        visible={visible}
                        extra={
                            <Space>
                                <Button type="primary" onClick={onCloseDrawer}>OK</Button>
                            </Space>
                        }
                    >
                        <Switch 
                            checkedChildren="打开"
                            unCheckedChildren="关闭"
                            defaultChecked={false}
                            onChange={onSwitchChange}
                            className="text-red-600"
                        />
                    </Drawer>
                </div>
              </div>
            </Header>
        </>
    );
}



const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setOpenKeys: data => {
        dispatch(setOpenKeys(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader);
