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
 

const menuList = [
    {
        title: "首页",
        path: "/home",
        icon: <DashboardOutlined />,
        roles:["admin","editor","guest"]
    },
    {
        title: "用户管理",
        path: "/user-menu",
        icon: <UserOutlined />,
        roles:["admin","editor"],
        children: [
            {
                title: "用户列表",
                path: "/user-menu/user-list",
                roles:["admin","editor"],
            },
            {
                title: "角色列表",
                path: "/user-menu/role-list",
                roles:["admin"],
            },
        ],
    },
    {
        title: "设置管理",
        path: "/setting-menu",
        icon: <SettingOutlined />,
        roles:["admin","editor","guest"],
        children: [
            {
                title: "用户设置",
                path: "/setting-menu/user-setting",
                roles:["admin","editor","guest"],
                children: [
                    { 
                        title: "基本资料",
                        path: "/setting-menu/user-setting/basic-info",
                        roles:["admin","editor","guest"],
                    },
                    { 
                        title: "修改密码",
                        path: "/setting-menu/user-setting/modify-password",
                        roles:["admin","editor","guest"],
                    }
                ]
            }
        ]
    },
    { 
        title: "图标",
        path: "/icon", 
        icon: <CopyOutlined />,
        roles:["admin","editor","guest"],
    },
    { 
        title: "图表",
        path: "/chart",
        icon: <AreaChartOutlined />,
        roles:["admin","editor","guest"],
        children: [
            { 
                title: "折线图",
                path: "/chart/line",
                roles:["admin","editor","guest"],
            },
            { 
                title: "柱状图",
                path: "/chart/bar",
                roles:["admin","editor","guest"],
            },
            { 
                title: "饼状图",
                path: "/chart/pie",
                roles:["admin","editor","guest"],
            },
            { 
                title: "键盘图",
                path: "/chart/key-board",
                roles:["admin","editor","guest"],
            },
            { 
                title: "混合图表",
                path: "/chart/mix",
                roles:["admin","editor","guest"],
            },
            { 
                title: "全国地图",
                path: '/chart/china',
                roles:["admin","editor","guest"],
            }
        ]
    },
    { 
        title: "组件",
        path: "/module",
        icon: <AppstoreOutlined />,
        roles:["admin","editor","guest"],
        children: [
            { 
                title: "Excel",
                path: "/module/excel",
                roles:["admin","editor","guest"],
            },
            { 
                title: "Zip",
                path: "/module/zip",
                roles:["admin","editor","guest"],
            },
            { 
                title: "Pdf",
                path: "/module/pdf",
                roles:["admin","editor","guest"],
            },
            { 
                title: "文件管理",
                path: "/module/file-admin",
                roles:["admin","editor","guest"],
            },
            { 
                title: "富文本",
                path: "/module/rich-text",
                roles:["admin","editor","guest"],
            },
            { 
                title: "MarkDown",
                path: "/module/mark-down",
                roles:["admin","editor","guest"],
            }
        ]
    },
    { 
        title: "权限测试",
        path: "/authority",
        icon: <EyeInvisibleOutlined />,
        roles:["admin","editor","guest"],
    },
    { 
        title: "错误页面",
        path: "/error",
        icon: <StopOutlined />,
        roles:["admin","editor","guest"],
        children: [
            { 
                title: "权限不足",
                path: "/error/no-authority",
                roles:["admin","editor","guest"],
            },
            { 
                title: "页面丢失",
                path: "/error/not-found",
                roles:["admin","editor","guest"],
            },
            { 
                title: "服务器错误",
                path: "/error/server-error",
                roles:["admin","editor","guest"],
            }
        ]
    }
];

export default menuList;