import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Drawer, Switch, Space, Button, Divider } from 'antd';
import { setFixedHeader, setLogo, setTag } from "@/store/actions/setting";


const DrawerSettings = (props) => {
    const { drawerVisible, fixedHeader, setDrawerVisible, setFixedHeader, logo, setLogo, showTag, setTag } = props;
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
                    defaultChecked={fixedHeader}
                    onChange={(checked) => setFixedHeader(checked)}
                />
            </div>
            <Divider dashed />

            <div className="flex justify-between items-center">
                <span>侧边栏 Logo</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={logo}
                    onChange={(checked) => setLogo(checked)}
                />
            </div>
            <Divider dashed />

            <div className="flex justify-between items-center">
                <span>标签页</span>
                <Switch
                    checkedChildren="打开"
                    unCheckedChildren="关闭"
                    defaultChecked={showTag}
                    onChange={(checked) => setTag(checked)}
                />
            </div>
        </Drawer>
    )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setFixedHeader: data => {
        dispatch(setFixedHeader(data))
    },
    setLogo: data => {
        dispatch(setLogo(data))
    },
    setTag: data => {
        dispatch(setTag(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DrawerSettings);