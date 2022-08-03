import React from 'react';
import { connect } from 'react-redux';
import { Drawer, Switch, Space, Button, Divider } from 'antd';
import { setSettings } from "@/store/actions/settings";

const DrawerSettings = (props) => {
    const { drawerVisible, setDrawerVisible, settings, setSettings } = props;
    const onSettings = (checked, type) => {
        switch (type) {
            case 'fixedHeader':
                setSettings({ ...settings, fixedHeader: checked });
                break;
            case 'showLogo':
                setSettings({ ...settings, showLogo: checked });
                break;
            case 'showTag':
                setSettings({ ...settings, showTag: checked });
                break;
            default:
                break;
        }
    }
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
                    onChange={(checked) => onSettings(checked, 'fixedHeader')}
                />
            </div>
            <Divider dashed />

            <div className="flex justify-between items-center">
                <span>侧边栏 Logo</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={settings.showLogo}
                    onChange={(checked) => onSettings(checked, 'showLogo')}
                />
            </div>
            <Divider dashed />

            <div className="flex justify-between items-center">
                <span>标签页</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={settings.showTag}
                    onChange={(checked) => onSettings(checked, 'showTag')}
                />
            </div>
        </Drawer>
    );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setSettings: data => {
        dispatch(setSettings(data))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerSettings);