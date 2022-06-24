import React, { Component } from 'react';
import { Layout, Menu } from "antd";
import { withRouter } from 'react-router-dom';
import mapMenu from "@/routes/menu";
import { formatRole, resolveMenuList } from '@/utils/formatTool';
import './style.less';


class SideMenu extends Component {
    state = {
        menuTree: []
    };
    onCollapse = () => {
        this.props.setCollapse({ show: !this.props.collapse.show});
        localStorage.setItem('collapse', JSON.stringify({ show: !this.props.collapse.show}));
    };
    handleRecursionMenuTree = (item, children) => {
        return (
            <Menu.SubMenu key={item.path} icon={item.icon} title={item.name}>
                {
                    children.map(child => {
                        if (!child.children) {
                            return <Menu.Item key={child.path} icon={child.icon}>{child.name}</Menu.Item>;
                        }
                        return this.handleRecursionMenuTree(child, child.children);
                    })
                }
            </Menu.SubMenu>
        );
    };
    handleMenuTree = (userInfo) => {
        const role = formatRole(userInfo.role);
        const menuList = resolveMenuList(mapMenu, role);

        const menuTree = menuList.map(item => {
            if (!item.children) {
                return <Menu.Item key={item.path} icon={item.icon}>{item.name}</Menu.Item>;
            };
            return this.handleRecursionMenuTree(item, item.children);
        });
        this.setState({menuTree});
    };
    handleBreadCrumb = (item, breadCrumbData) => {
        const keys = item.keyPath.reverse();
        const values = breadCrumbData;
        const data = [];
        keys.forEach((key, index) => {
            const object = {};
            // object[key] = values[index];
            object.key = key;
            object.value = values[index];
            data.push(object);
        });
        this.props.addBreadCrumb(data);
    };
    handleRecursionRouter = (item, children, breadCrumbData) => {
        let result = null;
        children.find(child => {
            if (!child.children) {
                result = child.path === item.key ? child : null;
                if (result) {
                    breadCrumbData.push(child.name);
                }
                return result;
            } else {
                result = this.handleRecursionRouter(item, child.children, breadCrumbData);
                if (result) {
                    breadCrumbData.push(child.name);
                    // 位置调换
                    const length = breadCrumbData.length;
                    const temporary = breadCrumbData[length - 1];
                    breadCrumbData[length - 1] = breadCrumbData[length - 2];
                    breadCrumbData[length - 2] = temporary;
                }
                return result;
            }
        });
        return result
    };
    handleRouter = (item) => {
        let outChild = null;
        let breadCrumbData = [];
        mapMenu.find(subMenu => {
            if (!subMenu.children) {
                outChild = subMenu.path === item.key ? subMenu : null;
                breadCrumbData.length = 0;
                breadCrumbData.push(subMenu.name);
                return outChild;
            } else {
                breadCrumbData.length = 0;
                breadCrumbData.push(subMenu.name);
                outChild = this.handleRecursionRouter(item, subMenu.children, breadCrumbData);
                return outChild;
            }
        });
        
        // 加入面包屑
        this.handleBreadCrumb(item, breadCrumbData);
        // 加入标签列表
        this.props.addTag(outChild);
        this.props.history.push(`/${item.key}`);
    };
    componentDidMount() {
        this.handleMenuTree(this.props.userInfo);
    };
    render() { 
        const { collapse, theme } = this.props;
        return (  
            <Layout.Sider 
                width={200} 
                theme={theme.type} 
                className="site-layout-background"
                style={{overflowX: "hidden", overflowY: "auto"}}
                collapsible  
                collapsed={collapse.show} 
                onCollapse={this.onCollapse}>
                    <Menu
                        mode="inline"
                        style={{height: '100%'}}
                        theme={theme.type}
                        onClick={this.handleRouter}>
                            {
                                this.state.menuTree.map(item => {
                                    return item;
                                })
                            }
                    </Menu>
            </Layout.Sider>
        );
    };
};
export default withRouter(SideMenu);