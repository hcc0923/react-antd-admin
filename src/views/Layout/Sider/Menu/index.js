import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { 
    ProLayout,
  } from '@ant-design/pro-components';

import { getMenuItemInMenuListByProperty } from "@/utils";
import menuList from '@/router/menuList';
const SubMenu = Menu.SubMenu;
// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


function SiderMenu(props) {
    const [menuTreeNode, setMenuTreeNode] = useState([]);
    const [authMenuList, setAuthMenuList] = useState([]);
    const [openKey, setOpenKey] = useState([]);
    const path = props.location.pathname;

    const filterMenuItem = (item) => {
        const { roles } = item;
        const role = 'editor';
        if (!roles || roles.includes(role)) {
            return true;
        }
        return false;
    }
    const handleMenuAuthority = (menuList) => {
        const arr = []
        menuList?.map((item) => {
            if(filterMenuItem(item)){
                arr.push(item);
                if(item?.children){
                    const children = handleMenuAuthority(item?.children);
                    item.children = children;
                }
            }
            return item;
        })
        return arr
        // return menuList.reduce((initial, item) => {
        //     if (filterMenuItem(item)) {
        //         if (!item.children) {
        //             initial.push(item);
        //         } else {
        //             // const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
        //             // if (cItem) {
        //             //     setOpenKey([...openKey, item.key])
        //             // }
        //             // initial.push(item);
        //             return handleMenuAuthority(item.children)
        //         }
        //     }
        //     return initial;
        // }, []);
    }
    const getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (filterMenuItem(item)) {
                if (!item.children) {
                    pre.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                {item.icon ? item.icon : null}
                                <span>{item.label}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                    if (cItem) {
                        setOpenKey([...openKey, item.key])
                    }

                    pre.push(
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    {item.icon ? item.icon : null}
                                    <span>{item.label}</span>
                                </span>
                            }
                        >
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
            return pre;
        }, []);
    }
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
          }
          const _items = reorder(
            this.state.menuTreeNode,
            result.source.index,
            result.destination.index
          );
          setMenuTreeNode(_items);
    }
    const handleMenuSelect = ({ key = "/home" }) => {
        let menuItem = getMenuItemInMenuListByProperty(menuList, "key", key);
        // props.addTag(menuItem)
    }
    useEffect(() => {
        // const menuTreeNode = getMenuNodes(menuList);
        // console.log(menuTreeNode);
        // setMenuTreeNode(menuTreeNode);
        // handleMenuSelect(openKey);
        const authorityMenu = handleMenuAuthority(menuList);
        setAuthMenuList(authorityMenu)
        console.log(authorityMenu);
    }, [])
   
    return(
        <div style={{ height: "calc(100% - 64px)" }}>
            <Scrollbars
                autoHide 
                autoHideTimeout={1000} 
                autoHideDuration={200}
            >   
                <Menu
                    mode="inline"
                    theme="dark"
                    onSelect={({ key}) => handleMenuSelect({ key})}
                    selectedKeys={[path]}
                    defaultOpenKeys={openKey}
                    items={authMenuList}
                />
            </Scrollbars>
        </div>
    )
}


const mapStateToProps = state => state;


export default connect(mapStateToProps)(withRouter(SiderMenu));