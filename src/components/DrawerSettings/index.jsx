import React from 'react';
import { connect } from 'react-redux';
import { Drawer, Switch, Space, Button, Divider } from 'antd';
import { setFixedHeader, setShowLogo, setShowTag } from "@/store/actions/settings";

const DrawerSettings = (props) => {
    const { drawerVisible, setDrawerVisible, settings, setFixedHeader, setShowLogo, setShowTag } = props;
    return (
        <Drawer
            title="系统设置"
            closeIcon={<></>}
            placement="right"
            visible={drawerVisible}
            headerStyle={{boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)"}}
            extra={
                <Space >
                    <Button type="primary" onClick={() => setDrawerVisible(false)}>
                    OK
                    </Button>
                </Space>
            
            }
        >
            <div className="flex justify-between items-center">
                <span>固定 Header</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={settings.fixedHeader}
                    onChange={(checked) => setFixedHeader(checked)}
                />
            </div>
            <Divider dashed />

            <div className="flex justify-between items-center">
                <span>侧边栏 Logo</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={settings.showLogo}
                    onChange={(checked) => setShowLogo(checked)}
                />
            </div>
            <Divider dashed />

            <div className="flex justify-between items-center">
                <span>标签页</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={settings.showTag}
                    onChange={(checked) => setShowTag(checked)}
                />
            </div>
        </Drawer>
    );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setFixedHeader: data => {
        dispatch(setFixedHeader(data))
    },
    setShowLogo: data => {
        dispatch(setShowLogo(data))
    },
    setShowTag: data => {
        dispatch(setShowTag(data))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerSettings);