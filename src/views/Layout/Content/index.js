import React from 'react';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from 'antd';
import { getMenuItemInMenuListByProperty } from "@/utils";
import routeList from '@/router/routeList';
import menuList from '@/router/menuList';
const { Content } = Layout;


function LayoutContent(props) {
    const { location } = props;
    const { pathname } = location;
    const role = 'admin';
    const getPageTitle = (menuList, pathname) => {
        let item = getMenuItemInMenuListByProperty(menuList, "key", pathname);
        console.log();
        if (item) {
            return item.label;
        }
    };
    const handleFilter = (route) => {
        // 过滤没有权限的页面
        return role === "admin" || !route.roles || route.roles.includes(role);
    };
    return (
        <DocumentTitle title={"标题"}>
            <Content 
            style={{
                height: "calc(100% - 100px)",
                width: "100%"
              }}
            >
                <TransitionGroup>
                    <CSSTransition
                        key={location.pathname}
                        timeout={500}
                        classNames="fade"
                        exit={false}
                    >
                        <Switch location={location}>
                            <Redirect exact from="/" to="/home" />
                            {routeList.map((route) => {
                                return (
                                handleFilter(route) && (
                                    <Route
                                    component={route.component}
                                    key={route.path}
                                    path={route.path}
                                    />
                                )
                                );
                            })}
                            <Redirect to="/error/not-found" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Content>
        </DocumentTitle>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(LayoutContent));