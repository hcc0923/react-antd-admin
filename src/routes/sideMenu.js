import {
    DashboardOutlined,
    UserOutlined, 
    CopyOutlined,
    SettingOutlined,
    StopOutlined,
    AreaChartOutlined,
    AppstoreOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';
 

const sideMenu = [
    {
        path: '/dashboard',
        name: '主页',
        icon: <DashboardOutlined />,
    },
    {
        path: '/user-menu',
        name: '用户管理',
        icon: <UserOutlined />,
        routes: [
            {
                path: '/user-menu/user-list',
                name: '用户列表',
            },
            {
                path: '/user-menu/role-list',
                name: '角色列表',
            },
        ],
    },
    {
        path: '/setting-menu',
        name: '设置管理',
        icon: <SettingOutlined />,
        routes: [
            {
                path: '/setting-menu/user-setting',
                name: '用户设置',
                routes: [
                    { 
                        path: '/setting-menu/user-setting/basic-info',
                        name: '基本资料'
                    },
                    { 
                        path: '/setting-menu/user-setting/modify-password',
                        name: '修改密码'
                    }
                ]
            }
        ]
    },
    { 
        path: '/icon-list', 
        name: '图标',
        icon: <CopyOutlined />,
    },
    { 
        path: '/chart',
        name: '图表',
        icon: <AreaChartOutlined />,
        routes: [
            { 
                path: '/chart/line',
                name: '折线图',
            },
            { 
                path: '/chart/bar',
                name: '柱状图'
            },
            { 
                path: '/chart/pie',
                name: '饼状图'
            },
            { 
                path: '/chart/key-board',
                name: '键盘图'
            },
            { 
                path: '/chart/mix',
                name: '混合图表'
            },
            { 
                path: '/chart/china',
                name: '全国地图'
            }
        ]
    },
    { 
        path: '/module',
        name: '组件', 
        icon: <AppstoreOutlined />,
        routes: [
            { 
                path: '/module/excel',
                name: 'Excel',
            },
            { 
                path: '/module/zip',
                name: 'Zip'
            },
            { 
                path: '/module/pdf',
                name: 'Pdf'
            },
            { 
                path: '/module/file-admin',
                name: '文件管理'
            },
            { 
                path: '/module/rich-text',
                name: '富文本'
            },
            { 
                path: '/module/mark-down',
                name: 'MarkDown'
            }
        ]
    },
    { 
        path: '/authority',
        name: '权限测试', 
        icon: <EyeInvisibleOutlined />,
    },
    { 
        path: '/error-page',
        name: '错误页面', 
        icon: <StopOutlined />,
        routes: [
            { 
                path: '/error-page/no-authority',
                name: '权限不足'
            },
            { 
                path: '/error-page/not-found',
                name: '页面丢失'
            },
            { 
                path: '/error-page/server-error',
                name: '服务器错误'
            }
        ]
    }
];

export default sideMenu;