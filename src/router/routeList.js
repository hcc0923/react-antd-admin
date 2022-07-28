import loadable from '@loadable/component';


const routeList = [
    { 
        path: "/home", 
        component: loadable(() => import('@/views/Home/index')),
    },
    { 
        path: "/user-menu/user-list", 
        component: loadable(() => import('@/views/User/user-list')),
    },
    { 
        path: "/user-menu/role-list", 
        component: loadable(() => import('@/views/User/role-list')),
    },
    { 
        path: "/setting-menu/user-setting/basic-info", 
        component: loadable(() => import('@/views/Setting/My/basic-info')),
    },
    { 
        path: "/setting-menu/user-setting/modify-password", 
        component: loadable(() => import('@/views/Setting/My/modify-password')),
    },
    { 
        path: "/icon", 
        component: loadable(() => import('@/views/Icon/index')),
    },
    { 
        path: "/chart/line", 
        component: loadable(() => import('@/views/Chart/line')),
    },
    { 
        path: "/chart/bar", 
        component: loadable(() => import('@/views/Chart/bar')),
    },
    { 
        path: "/chart/line", 
        component: loadable(() => import('@/views/Chart/line')),
    },
    { 
        path: "/chart/pie", 
        component: loadable(() => import('@/views/Chart/pie')),
    },
    { 
        path: "/chart/key-board", 
        component: loadable(() => import('@/views/Chart/key-board')),
    },
    { 
        path: "/chart/mix", 
        component: loadable(() => import('@/views/Chart/mix')),
    },
    { 
        path: "/chart/china", 
        component: loadable(() => import('@/views/Chart/china')),
    },
    { 
        path: "/module/excel", 
        component: loadable(() => import('@/views/Module/excel')),
    },
    { 
        path: "/module/zip", 
        component: loadable(() => import('@/views/Module/zip')),
    },
    { 
        path: "/module/pdf", 
        component: loadable(() => import('@/views/Module/pdf')),
    },
    { 
        path: "/module/file-admin", 
        component: loadable(() => import('@/views/Module/file-admin')),
    },
    { 
        path: "/module/rich-text", 
        component: loadable(() => import('@/views/Module/rich-text')),
    },
    { 
        path: "/module/mark-down", 
        component: loadable(() => import('@/views/Module/mark-down')),
    },
    { 
        path: "/authority", 
        component: loadable(() => import('@/views/Authority/index')),
    },
    { 
        path: "/error/no-authority", 
        component: loadable(() => import('@/views/Error/no-authority')),
    },
    { 
        path: "/error/not-found", 
        component: loadable(() => import('@/views/Error/not-found')),
    },
    { 
        path: "/error/server-error", 
        component: loadable(() => import('@/views/Error/server-error')),
    },
];
export default routeList;