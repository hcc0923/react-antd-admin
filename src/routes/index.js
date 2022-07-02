import React from 'react';
import { Redirect } from 'react-router-dom';
import store from '@/store/store';
import RouteComponent from "./component";
import { resolveTitle } from '@/utils/formatTool';
import {
    DashboardOutlined,
    UserOutlined, 
    CopyOutlined,
    SettingOutlined,
    StopOutlined,
    AreaChartOutlined,
    AppstoreOutlined,
    StockOutlined,
    CopyrightOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';



const routes = [
    {
        path: "/login",
        hideInMenu: true,
        meta: { title: "登录", roles: ["user", "admin", "root"]},
        component: RouteComponent.Login 
    },
    {
        path: "/forget",
        hideInMenu: true,
        meta: { title: "忘记密码", roles: ["user", "admin", "root"]},
        component: RouteComponent.Forget
    },
    {
        path: '/401',
        hideInMenu: true,
        meta: { title: "权限不足", roles: ["user", "admin", "root"]},
        component: RouteComponent.NoAuth
    },
    {
        path: '/404',
        hideInMenu: true,
        meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
        component: RouteComponent.NotFound
    },
    {
        path: '/500',
        hideInMenu: true,
        meta: { title: "服务器错误", roles: ["user", "admin", "root"]},
        component: RouteComponent.ServerError
    },
    {
        render(props) {
            const token = store.getState().token;
            if (!token) {
                return <Redirect to="/login" />;
            };
            const { location, route } = props;
            resolveTitle(location, route);
            return <RouteComponent.Layout {...props} />;
        },
        routes: [
            {
                path: '/',
                name: "首页",
                exact: true,
                icon: <DashboardOutlined />,
                meta: { title: "首页", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/dashboard" />
            },
            {
                path: '/dashboard',
                meta: { title: "首页", roles: ["user", "admin", "root"]},
                component: RouteComponent.Dashboard
            },
            {
                render(props) {
                   return <RouteComponent.Container {...props} />;
                },
                name: '用户管理',
                icon: <UserOutlined />,
                meta: { title: "用户管理", roles: ["admin", "root"]},
                routes: [
                    {
                        path: '/user-list',
                        name: '用户列表',
                        meta: { title: "用户列表", roles: ["admin", "root"]},
                        render: () =>  store.getState().userInfo.role > 1 ? <RouteComponent.UserList /> : <Redirect to="/401" />
                    },
                    {
                        path: '/role-list',
                        name: '角色列表',
                        meta: { title: "角色列表", roles: ["root"]},
                        render: () =>  store.getState().userInfo.role > 2 ? <RouteComponent.RoleList /> : <Redirect to="/401" />
                    },
                ],
            },
            {
                render(props) {
                    return <RouteComponent.Container {...props} />;
                },
                name: '设置管理',
                icon: <SettingOutlined />,
                routes: [
                    {
                        path: '/user-setting',
                        name: '用户设置',
                        routes: [
                            { 
                                path: '/basic-info',
                                name: '基本资料',
                                meta: { title: "基本资料", roles: ["user", "admin", "root"]},
                                component: RouteComponent.BasicInfo
                            },
                            { 
                                path: '/modify-password',
                                name: '修改密码',
                                meta: { title: "修改密码", roles: ["user", "admin", "root"]},
                                component: RouteComponent.ModifyPassword
                            }
                        ]
                    },
                    {
                        path: '/system-setting',
                        name: '系统设置',
                        meta: { title: "界面设置", roles: ["user", "admin", "root"]},
                        component: RouteComponent.System
                    }
                ]
            },
            {
                path: '/icon-list',
                name: '图标',
                icon: <CopyOutlined />,
                meta: { title: "图标", roles: ["user", "admin", "root"]},
                component: RouteComponent.IconList
            },
            { 
                render(props) {
                    return <RouteComponent.Container {...props} />;
                },
                name: '图表',
                icon: <AreaChartOutlined />,
                routes: [
                    { 
                        path: '/line',
                        name: '折线图',
                        meta: { title: "折线图", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Line
                    },
                    { 
                        path: '/bar',
                        name: '柱状图',
                        meta: { title: "柱状图", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Bar
                    },
                    { 
                        path: '/pie',
                        name: '饼状图',
                        meta: { title: "饼状图", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Pie
                    },
                    { 
                        path: '/key-board',
                        name: '键盘图',
                        meta: { title: "键盘图", roles: ["user", "admin", "root"]},
                        component: RouteComponent.KeyBoard
                    },
                    { 
                        path: '/mix',
                        name: '混合图表',
                        meta: { title: "混合图表", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Mix
                    }
                ]
            },
            { 
                render(props) {
                    return <RouteComponent.Container {...props} />;
                },
                name: '组件', 
                icon: <AppstoreOutlined />,
                routes: [
                    { 
                        path: '/excel',
                        name: 'Excel',
                        meta: { title: "Excel", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Excel
                    },
                    { 
                        path: '/zip',
                        name: 'Zip',
                        meta: { title: "Zip", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Zip
                    },
                    { 
                        path: '/pdf',
                        name: 'Pdf',
                        meta: { title: "Pdf", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Pdf
                    },
                    { 
                        path: '/udfile',
                        name: '上传下载文件',
                        meta: { title: "上传下载文件", roles: ["user", "admin", "root"]},
                        component: RouteComponent.UDFile
                    },
                    { 
                        path: '/rich-text',
                        name: '富文本',
                        meta: { title: "富文本", roles: ["user", "admin", "root"]},
                        component: RouteComponent.RichText
                    },
                    { 
                        path: '/mark-down',
                        name: 'MarkDown',
                        meta: { title: "MarkDown", roles: ["user", "admin", "root"]},
                        component: RouteComponent.MarkDown
                    }
                ]
            },
            { 
                render(props) {
                    return <RouteComponent.Container {...props} />;
                },
                name: '权限测试', 
                icon: <EyeInvisibleOutlined />,
                routes: [
                    { 
                        path: '/authority',
                        name: '权限切换',
                        meta: { title: "权限测试", roles: ["user", "admin", "root"]},
                        component: RouteComponent.Authority
                    },
                    { 
                        path: '/page',
                        name: '权限页面',
                        meta: { title: "路由拦截", roles: ["user", "admin", "root"]},
                        render: () => store.getState().userInfo.role > 1 ? <RouteComponent.Page /> : <Redirect to="/401" />
                    }
                ]
            },
            { 
                render(props) {
                    return <RouteComponent.Container {...props} />;
                },
                name: '错误页面', 
                icon: <StopOutlined />,
                routes: [
                    { 
                        path: '/401',
                        name: '401',
                        meta: { title: "权限不足", roles: ["user", "admin", "root"]},
                        component: RouteComponent.NoAuth
                    },
                    { 
                        path: '/404',
                        name: '404',
                        meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
                        component: RouteComponent.NotFound
                    },
                    { 
                        path: '/500',
                        name: '500',
                        meta: { title: "服务器错误", roles: ["user", "admin", "root"]},
                        component: RouteComponent.ServerError
                    }
                ]
            },
            { 
                path: '/epidemic-map',
                name: '疫情地图',
                icon: <StockOutlined />,
                meta: { title: "疫情地图", roles: ["user", "admin", "root"]},
                component: RouteComponent.EpidemicMap
            },
            { 
                path: '/about', 
                name: '关于' ,
                icon: <CopyrightOutlined />,
                meta: { title: "关于", roles: ["user", "admin", "root"]},
                component: RouteComponent.About
            },
            {
                path: '*',
                name: '404',
                meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/404" />
            }
        ]
    },
    {
        path: '*',
        hideInMenu: true,
        component: RouteComponent.NotFound
    }
];
export default routes;