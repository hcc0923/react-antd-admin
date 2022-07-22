import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Menu } from 'antd';

import { getMenuItemInMenuListByProperty } from "@/utils";
import menuList from '@/router/menuList';


function SiderMenu(props) {
    const path = props.location.pathname;
    const [menuPermission, setMenuPermission] = useState([]);
    const [openKey, setOpenKey] = useState([path]);
    const [subMenuKey, setSubMenuKey] = useState(['/setting-menu/user-setting', '/setting-menu']);
    
    const role = 'user';


    const authMenuItem = (item) => {
        const { roles } = item;
        if (!roles || roles.includes(role)) {
            return true;
        }
        return false;
    }
    const handleMenuPermission = (menuList) => {
        const menuData = [];
        menuList.forEach((item) => {
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
   
    const handleMenuSelect = (data) => {
        const { key, keyPath } = data;
        console.log(keyPath);
        setOpenKey(keyPath);
        props.history.push(key);
    }
    useEffect(() => {
        console.log(path);
        const menuData = handleMenuPermission(menuList);
        setMenuPermission(menuData);
    }, [path])
   

    console.log(openKey);
    return(
        <div style={{ height: "calc(100% - 64px)" }}>
            <Menu
                mode="inline"
                theme="dark"
                items={menuPermission}
                selectedKeys={openKey}
                defaultOpenKeys={subMenuKey}
                defaultSelectedKeys={openKey}
                onSelect={(data) => handleMenuSelect(data)}
            />
        </div>
    )
}


const mapStateToProps = state => state;


export default connect(mapStateToProps)(withRouter(SiderMenu));