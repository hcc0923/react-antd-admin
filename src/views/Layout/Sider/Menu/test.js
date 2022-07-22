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
    const [openKey, setOpenKey] = useState([]);
    const path = props.location.pathname;

    const filterMenuItem = (item) => {
        const { roles } = item;
        const role = 'admin';
        if (!roles || roles.includes(role)) {
            return true;
        }
        return false;
    }
    const getMenuNodes = (menuList) => {
        
        return menuList.reduce((pre, item) => {
            if (filterMenuItem(item)) {
                if (!item.children) {
                    pre.push(
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>
                                {item.icon ? item.icon : null}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0);
                    if (cItem) {
                        setOpenKey([...openKey, item.path])
                    }

                    pre.push(
                        <SubMenu
                            key={item.path}
                            title={
                                <span>
                                    {item.icon ? item.icon : null}
                                    <span>{item.title}</span>
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
        let menuItem = getMenuItemInMenuListByProperty(menuList, "path", key);
        // props.addTag(menuItem)
    }
    useEffect(() => {
        const menuTreeNode = getMenuNodes(menuList);
        console.log(menuTreeNode);
        setMenuTreeNode(menuTreeNode);
        handleMenuSelect(openKey);
    }, [])
   
    return(
        <div style={{ height: "calc(100% - 64px)" }}>
            <Scrollbars
                autoHide 
                autoHideTimeout={1000} 
                autoHideDuration={200}
            >   
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    menuTreeNode.map((item, index) => (
                                        <Draggable
                                            key={item.key}
                                            draggableId={item.key}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Menu
                                                        mode="inline"
                                                        theme="dark"
                                                        onSelect={({ key}) => handleMenuSelect({ key})}
                                                        selectedKeys={[path]}
                                                        defaultOpenKeys={openKey}
                                                        items={menuList}
                                                    >
                                                        {/* {item} */}
                                                    </Menu>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Scrollbars>
        </div>
    )
}


const mapStateToProps = state => state;


export default connect(mapStateToProps)(withRouter(SiderMenu));