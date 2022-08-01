import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { addTag } from "@/store/actions/tag";
import Logo from "@/components/Logo";
import menuList from '@/router/menuList';
import { setCollapse } from "@/store/actions/setting";
const { Sider } = Layout;

const LayoutSider = (props) => {
    const { location, logo } = props;
    const { pathname } = location;
    const [menuPermission, setMenuPermission] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const role = 'root';


    const onCollapseSider = (collapsed) => {
        props.setCollapse({ collapsed });
    }
    const authMenuItem = (item) => {
        const { roles } = item;
        if (!roles || roles.includes(role)) {
            return true;
        }
        return false;
    }
    const handleMenuPermission = (menuList) => {
        const menuData = [];
        menuList.forEach(item => {
            if(authMenuItem(item)){
                menuData.push(item);
                if(item.children){
                    const children = handleMenuPermission(item.children);
                    item.children = children;
                }
            }
        });
        return menuData;
    }
    const openKeysData = [];
    const handleOpenKeys = (menuList) => {
        menuList.forEach(item => {
            if (item.children) {
                const cItem = item.children.find(child => pathname.indexOf(child.key) === 0);
                if (cItem) {
                    openKeysData.push(item.key);
                    handleOpenKeys(item.children);
                }
            }
        });
    }
    const handleMenuSelect = (data) => {
        const { key, domEvent } = data;
        props.addTag({ label: domEvent.target.innerText, key });
        props.history.push(key);
    }
    useEffect(() => {
        const menuData = handleMenuPermission(menuList);
        setMenuPermission(menuData);
    }, []);
    useEffect(() => {
        handleOpenKeys(menuList);
        setOpenKeys(openKeysData);
    }, [pathname]);
    return (
        <Sider
            theme={"dark"}
            collapsible
            collapsed={props.collapse.collapsed}
            onCollapse={onCollapseSider}
            style={{ overflow: 'auto', height: '100vh',zIndex: 100 }}
        >
            { logo ? <Logo /> : null}
            <div style={{ height: "calc(100% - 64px)" }}>
                <Menu
                    mode="inline"
                    theme="dark"
                    items={menuPermission}
                    defaultOpenKeys={openKeys}
                    openKeys={openKeys}
                    selectedKeys={[pathname]}
                    onOpenChange={(openKeys) => setOpenKeys(openKeys)}
                    onSelect={handleMenuSelect}
                />
            </div>
        </Sider>
    )
}


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setCollapse: data => {
        dispatch(setCollapse(data));
    },
    addTag: data => {
        dispatch(addTag(data));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LayoutSider));

