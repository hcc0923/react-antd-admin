import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
// import { getUserInfo } from "@/store/actions";
import Layout from "@/views/Layout";
import Login from "@/views/Login/login";


function Router(props) {
    // const { role } = props;
    const role = 'admin';
    const token = 'xxx';
    const getUserInfo = (data) => {
        return new Promise((resolve, reject) => {
            const userInfo = {
                avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
                description: "拥有系统内所有菜单和路由权限",
                id: "admin",
                name: "难凉热血",
                role: "admin"
            }
            localStorage.setItem('testData', userInfo)
        })
    }
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route
                    path="/"
                    render={() => {
                        if (!token) {
                            return <Redirect to="/login" />;
                        } else {
                            if (role) {
                                return <Layout />;
                            } else {
                                // 用token换信息  role
                                getUserInfo(token).then(() => {
                                    return <Layout />;
                                })
                            }
                        }
                    }}
                />
            </Switch>
        </HashRouter>
    );
}


export default Router;