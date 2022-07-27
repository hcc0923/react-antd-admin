import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Menu } from 'antd';
import { addTag } from "@/store/actions/tag";
import menuList from '@/router/menuList';

const SiderMenu = (props) => {
    const path = props.location.pathname;
    const [menuPermission, setMenuPermission] = useState([]);
    const [openKey, setOpenKey] = useState([]);
    
    const role = 'admin';


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
    const handleOpenKey = (menuList) => {
        menuList.forEach(item => {
            if (item.children) {
                const cItem = item.children.find(child => path.indexOf(child.key) === 0);
                if (cItem) {
                    setOpenKey([...openKey, item.key]);
                }
                handleOpenKey(item.children);
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
        // openKey.length = 0;
        handleOpenKey(menuList);
    }, [path])
    return(
        <div style={{ height: "calc(100% - 64px)" }}>
            <Menu
                mode="inline"
                theme="dark"
                items={menuPermission}
                defaultOpenKeys={openKey}
                openKeys={openKey}
                selectedKeys={[path]}
                onOpenChange={(openKeys) => setOpenKey(openKeys)}
                onSelect={handleMenuSelect}
            />
        </div>
    )
}



const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    addTag: data => {
        dispatch(addTag(data));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SiderMenu));