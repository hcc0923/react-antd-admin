import React from 'react';
import { Redirect } from 'react-router-dom';
import store from '@/store/store';
import RouteComponent from "./component";
import { resolveTitle } from '@/utils/formatTool';


const routes = [
    {
        path: "/login",
        meta: { title: "登录", roles: ["user", "admin", "root"]},
        component: RouteComponent.Login 
    },
    {
        path: "/forget",
        meta: { title: "忘记密码", roles: ["user", "admin", "root"]},
        component: RouteComponent.Forget
    },
    {
        path: '/401',
        meta: { title: "权限不足", roles: ["user", "admin", "root"]},
        component: RouteComponent.NoAuth
    },
    {
        path: '/404',
        meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
        component: RouteComponent.NotFound
    },
    {
        path: '/500',
        meta: { title: "服务器错误", roles: ["user", "admin", "root"]},
        component: RouteComponent.ServerError
    },
    {
        render(props) {
            console.log(props);
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
                exact: true,
                meta: { title: "首页", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/dashboard" />
            },
            {
                path: '/dashboard',
                meta: { title: "首页", roles: ["user", "admin", "root"]},
                component: RouteComponent.Dashboard
            },
            {
                path: '/user-list',
                meta: { title: "用户列表", roles: ["admin", "root"]},
                render: () =>  store.getState().userInfo.role > 1 ? <RouteComponent.UserList /> : <Redirect to="/401" />
            },
            {
                path: '/role-list',
                meta: { title: "角色列表", roles: ["root"]},
                render: () =>  store.getState().userInfo.role > 2 ? <RouteComponent.RoleList /> : <Redirect to="/401" />
            },
            {
                path: '/basic-info',
                meta: { title: "基本资料", roles: ["user", "admin", "root"]},
                component: RouteComponent.BasicInfo
            },
            {
                path: '/modify-password',
                meta: { title: "修改密码", roles: ["user", "admin", "root"]},
                component: RouteComponent.ModifyPassword
            },
            {
                path: '/system-setting',
                meta: { title: "界面设置", roles: ["user", "admin", "root"]},
                component: RouteComponent.System
            },
            {
                path: '/icon-list',
                meta: { title: "图标", roles: ["user", "admin", "root"]},
                component: RouteComponent.IconList
            },
            {
                path: '/line',
                meta: { title: "折线图", roles: ["user", "admin", "root"]},
                component: RouteComponent.Line
            },
            {
                path: '/bar',
                meta: { title: "柱状图", roles: ["user", "admin", "root"]},
                component: RouteComponent.Bar
            },
            {
                path: '/pie',
                meta: { title: "饼状图", roles: ["user", "admin", "root"]},
                component: RouteComponent.Pie
            },
            {
                path: '/key-board',
                meta: { title: "键盘图", roles: ["user", "admin", "root"]},
                component: RouteComponent.KeyBoard
            },
            {
                path: '/mix',
                meta: { title: "混合图表", roles: ["user", "admin", "root"]},
                component: RouteComponent.Mix
            },
            {
                path: '/excel',
                meta: { title: "Excel", roles: ["user", "admin", "root"]},
                component: RouteComponent.Excel
            },
            {
                path: '/zip',
                meta: { title: "Zip", roles: ["user", "admin", "root"]},
                component: RouteComponent.Zip
            },
            {
                path: '/pdf',
                meta: { title: "Pdf", roles: ["user", "admin", "root"]},
                component: RouteComponent.Pdf
            },
            {
                path: '/udfile',
                meta: { title: "上传下载文件", roles: ["user", "admin", "root"]},
                component: RouteComponent.UDFile
            },
            {
                path: '/rich-text',
                meta: { title: "富文本", roles: ["user", "admin", "root"]},
                component: RouteComponent.RichText
            },
            {
                path: '/mark-down',
                meta: { title: "MarkDown", roles: ["user", "admin", "root"]},
                component: RouteComponent.MarkDown
            },
            {
                path: '/authority',
                meta: { title: "权限测试", roles: ["user", "admin", "root"]},
                component: RouteComponent.Authority
            },
            {
                path: '/page',
                meta: { title: "路由拦截", roles: ["user", "admin", "root"]},
                render: () => store.getState().userInfo.role > 1 ? <RouteComponent.Page /> : <Redirect to="/401" />
            },
            {
                path: "/login",
                meta: { title: "登录", roles: ["user", "admin", "root"]},
                component: RouteComponent.Login 
            },
            {
                path: '/401',
                meta: { title: "权限不足", roles: ["user", "admin", "root"]},
                component: RouteComponent.NoAuth
            },
            {
                path: '/404',
                meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
                component: RouteComponent.NotFound
            },
            {
                path: '/500',
                meta: { title: "服务器错误", roles: ["user", "admin", "root"]},
                component: RouteComponent.ServerError
            },
            {
                path: '/epidemic-map',
                meta: { title: "疫情地图", roles: ["user", "admin", "root"]},
                component: RouteComponent.EpidemicMap
            },
            {
                path: '/about',
                meta: { title: "关于", roles: ["user", "admin", "root"]},
                component: RouteComponent.About
            },
            {
                path: '*',
                meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/404" />
            }
        ]
    },
    {
        path: '*',
        component: RouteComponent.NotFound
    }
];
export default routes;