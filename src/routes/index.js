import React from 'react';
import { Redirect } from 'react-router-dom';
import store from '@/store/store';
import { loadable } from '@/utils/tools';
import { resolveTitle } from '@/utils/formatTool';


const { token, userInfo } = store.getState();
const routes = [
    {
        path: "/login",
        meta: { title: "登录", roles: ["user", "admin", "root"]},
        component: loadable(() => import('@/views/Login/login')) 
    },
    {
        path: "/forget",
        meta: { title: "忘记密码", roles: ["user", "admin", "root"]},
        component: loadable(() => import('@/views/Login/forget')) 
    },
    {
        path: '/no-authority',
        meta: { title: "权限不足", roles: ["user", "admin", "root"]},
        component: loadable(() => import('@/views/Error/no-authority')) 
    },
    {
        render(props) {
            if (!token) {
                return <Redirect to="/login" />;
            }

            const { location, route } = props;
            resolveTitle(location, route);

            const Layout = loadable(() => import('@/views/Layout/index'));
            return <Layout {...props} />;
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
                meta: { title: "主页", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Dashboard/index')),
            },
            {
                path: '/user-menu/user-list',
                meta: { title: "用户列表", roles: ["admin", "root"]},
                render: () => {
                    const UserList = loadable(() => import('@/views/User/user-list'));
                    return userInfo.role > 1 ? <UserList /> : <Redirect to="/no-authority" />;
                }
            },
            {
                path: '/user-menu/role-list',
                meta: { title: "角色列表", roles: ["root"]},
                render: () => {
                    const RoleList = loadable(() => import('@/views/User/role-list'));
                    return userInfo.role > 2 ? <RoleList /> : <Redirect to="/no-authority" />;
                }
            },
            {
                path: '/user-menu',
                meta: { title: "用户管理", roles: ["admin", "root"]},
                render: () =>  <Redirect to="/user-menu/user-list" />
            },
            { 
                path: '/setting-menu/user-setting/basic-info',
                meta: { title: "基本资料", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Setting/My/basic-info'))
            },
            { 
                path: '/setting-menu/user-setting/modify-password',
                meta: { title: "修改密码", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Setting/My/modify-password'))
            },
            { 
                path: '/setting-menu/user-setting',
                meta: { title: "用户设置", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/setting-menu/user-setting/basic-info" />
            },
            { 
                path: '/setting-menu',
                meta: { title: "设置管理", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/setting-menu/user-setting/basic-info" />
            },
            {
                path: '/icon-list',
                meta: { title: "图标", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Icon/index'))
            },
            { 
                path: '/chart/line',
                meta: { title: "折线图", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Chart/line'))
            },
            { 
                path: '/chart/bar',
                meta: { title: "柱状图", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Chart/bar'))
            },
            { 
                path: '/chart/pie',
                meta: { title: "饼状图", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Chart/pie'))
            },
            { 
                path: '/chart/key-board',
                meta: { title: "键盘图", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Chart/keyboard'))
            },
            { 
                path: '/chart/mix',
                meta: { title: "混合图表", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Chart/mix'))
            },
            { 
                path: '/chart/china',
                meta: { title: "全国地图", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Chart/china/index'))
            },
            { 
                path: '/chart',
                meta: { title: "图表", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/chart/line" />
            },
            { 
                path: '/module/excel',
                meta: { title: "Excel", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Module/excel'))
            },
            { 
                path: '/module/zip',
                meta: { title: "Zip", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Module/zip'))
            },
            { 
                path: '/module/pdf',
                meta: { title: "Pdf", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Module/pdf'))
            },
            { 
                path: '/module/file-admin',
                meta: { title: "文件管理", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Module/file-admin'))
            },
            { 
                path: '/module/rich-text',
                meta: { title: "富文本", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Module/rich-text'))
            },
            { 
                path: '/module/mark-down',
                meta: { title: "MarkDown", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Module/markdown'))
            },
            { 
                path: '/module',
                meta: { title: "组件", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/chart/excel" />
            },
            { 
                path: '/authority',
                meta: { title: "权限测试", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Authority/index'))
            },
            { 
                path: '/error-page/no-authority',
                meta: { title: "权限不足", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Error/no-authority'))
            },
            { 
                path: '/error-page/not-found',
                meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Error/not-found'))
            },
            { 
                path: '/error-page/server-error',
                meta: { title: "服务器错误", roles: ["user", "admin", "root"]},
                component: loadable(() => import('@/views/Error/server-error'))
            },
            { 
                path: '/error-page',
                meta: { title: "错误页面", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/error-page/no-authority" />
            },
            {
                path: '*',
                meta: { title: "页面丢失", roles: ["user", "admin", "root"]},
                render: () => <Redirect to="/error-page/not-found" />
            }
        ]
    }
];

export default routes;