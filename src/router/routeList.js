import React from 'react';
import Home from  '@/views/Home/index';
import Home2 from  '@/views/User/user-list';
import Home3 from  '@/views/User/role-list';


const routeList = [
    { 
        path: "/home", 
        component: Home,
    },
    { 
        path: "/user-menu/user-list", 
        component: <Home2 />,
    },
    { 
        path: "/user-menu/role-list", 
        component: <Home3 />,
    }


    // { 
    //     path: "/user-menu/role-list", 
    //     component: Loadable({ loader: () => import('@/views/User/role-list'), loading: Loading }), 
    // },
    // { 
    //     path: "/setting-menu/user-setting/basic-info", 
    //     component: Loadable({ loader: () => import('@/views/Setting/My/basic-info'), loading: Loading }), 
    // },
    // { 
    //     path: "/setting-menu/user-setting/modify-password", 
    //     component: Loadable({ loader: () => import('@/views/Setting/My/modify-password'), loading: Loading }), 
    // },
    // { 
    //     path: "/icon", 
    //     component: Loadable({ loader: () => import('@/views/Icon/index'), loading: Loading }), 
    // },
    // { 
    //     path: "/chart/line", 
    //     component: Loadable({ loader: () => import('@/views/Chart/line'), loading: Loading }), 
    // },
    // { 
    //     path: "/chart/bar", 
    //     component: Loadable({ loader: () => import('@/views/Chart/bar'), loading: Loading }), 
    // },
    // { 
    //     path: "/chart/pie", 
    //     component: Loadable({ loader: () => import('@/views/Chart/pie'), loading: Loading }), 
    // },
    // { 
    //     path: "/chart/key-board", 
    //     component: Loadable({ loader: () => import('@/views/Chart/key-board'), loading: Loading }), 
    // },
    // { 
    //     path: "/chart/mix", 
    //     component: Loadable({ loader: () => import('@/views/Chart/mix'), loading: Loading }), 
    // },
    // { 
    //     path: "/chart/china", 
    //     component: Loadable({ loader: () => import('@/views/Chart/china/index'), loading: Loading }), 
    // },
    // { 
    //     path: "/module/excel", 
    //     component: Loadable({ loader: () => import('@/views/Module/excel'), loading: Loading }),
    // },
    // { 
    //     path: "/module/zip", 
    //     component: Loadable({ loader: () => import('@/views/Module/zip'), loading: Loading }),
    // },
    // { 
    //     path: "/module/pdf", 
    //     component: Loadable({ loader: () => import('@/views/Module/pdf'), loading: Loading }),
    // },
    // { 
    //     path: "/module/file-admin", 
    //     component: Loadable({ loader: () => import('@/views/Module/file-admin'), loading: Loading }),
    // },
    // { 
    //     path: "/module/rich-text", 
    //     component: Loadable({ loader: () => import('@/views/Module/rich-text'), loading: Loading }),
    // },
    // { 
    //     path: "/module/mark-down", 
    //     component: Loadable({ loader: () => import('@/views/Module/mark-down'), loading: Loading }),
    // },

    // { 
    //     path: "/authority", 
    //     component: Loadable({ loader: () => import('@/views/Authority/index'), loading: Loading }),
    // },
    // { 
    //     path: "/error/no-authority", 
    //     component: Loadable({ loader: () => import('@/views/Error/no-authority'), loading: Loading }),
    // },
    // { 
    //     path: "/error/not-found", 
    //     component: Loadable({ loader: () => import('@/views/Error/not-found'), loading: Loading }),
    // },
    // { 
    //     path: "/error/server-error", 
    //     component: Loadable({ loader: () => import('@/views/Error/server-error'), loading: Loading }),
    // },
];
export default routeList;