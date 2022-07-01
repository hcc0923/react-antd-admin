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
 
const sideMenu = [
    {
        path: '/dashboard',
        name: '首页',
        icon: <DashboardOutlined />,
    },
    {
        path: '/user-menu',
        name: '用户管理',
        icon: <UserOutlined />,
        routes: [
            {
                path: '/user-list',
                name: '用户列表'
            },
            {
                path: '/role-list',
                name: '角色列表'
            },
        ],
    },
    {
        path: '/setting-menu',
        name: '设置管理',
        icon: <SettingOutlined />,
        routes: [
            {
                path: '/user-setting',
                name: '用户设置',
                routes: [
                    { 
                        path: '/basic-info',
                        name: '基本资料'
                    },
                    { 
                        path: '/modify-password',
                        name: '修改密码'
                    }
                ]
            },
            {
                path: '/system-setting',
                name: '系统设置',
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
                path: '/line',
                name: '折线图',
            },
            { 
                path: '/bar',
                name: '柱状图'
            },
            { 
                path: '/pie',
                name: '饼状图'
            },
            { 
                path: '/key-board',
                name: '键盘图'
            },
            { 
                path: '/mix',
                name: '混合图表'
            }
        ]
    },
    { 
        path: '/module',
        name: '组件', 
        icon: <AppstoreOutlined />,
        routes: [
            { 
                path: '/excel',
                name: 'Excel',
            },
            { 
                path: '/zip',
                name: 'Zip'
            },
            { 
                path: '/pdf',
                name: 'Pdf'
            },
            { 
                path: '/udfile',
                name: '上传下载文件'
            },
            { 
                path: '/rich-text',
                name: '富文本'
            },
            { 
                path: '/mark-down',
                name: 'MarkDown'
            }
        ]
    },
    { 
        path: '/permission',
        name: '权限测试', 
        icon: <EyeInvisibleOutlined />,
        routes: [
            { 
                path: '/authority',
                name: '权限切换'
            },
            { 
                path: '/page',
                name: '权限页面'
            }
        ]
    },
    { 
        path: '/error-page',
        name: '错误页面', 
        icon: <StopOutlined />,
        routes: [
            { 
                path: '/401',
                name: '401'
            },
            { 
                path: '/404',
                name: '404'
            },
            { 
                path: '/500',
                name: '500'
            }
        ]
    },
    { 
        path: '/epidemic-map',
        name: '疫情地图',
        icon: <StockOutlined />
    },
    { 
        path: '/about', 
        name: '关于' ,
        icon: <CopyrightOutlined />
    }
]

export default sideMenu;