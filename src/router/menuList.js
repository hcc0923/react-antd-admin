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
        label: "首页",
        key: "/home",
        icon: <DashboardOutlined />,
        roles:["admin","editor","guest"]
    },
    {
        label: "用户管理",
        key: "/user-menu",
        icon: <UserOutlined />,
        roles:["admin","editor"],
        children: [
            {
                label: "用户列表",
                key: "/user-menu/user-list",
                icon: <UserOutlined />,
                roles:["admin","editor"],
            },
            {
                label: "角色列表",
                icon: <SettingOutlined />,
                key: "/user-menu/role-list",
                roles:["admin"],
            },
        ],
    },
    {
        label: "设置管理",
        key: "/setting-menu",
        icon: <SettingOutlined />,
        roles:["admin","editor","guest"],
        children: [
            {
                label: "用户设置",
                key: "/setting-menu/user-setting",
                roles:["admin","editor","guest"],
                children: [
                    { 
                        label: "基本资料",
                        key: "/setting-menu/user-setting/basic-info",
                        roles:["admin","editor","guest"],
                    },
                    { 
                        label: "修改密码",
                        key: "/setting-menu/user-setting/modify-password",
                        roles:["admin","editor","guest"],
                    }
                ]
            }
        ]
    },
    { 
        label: "图标",
        key: "/icon", 
        icon: <CopyOutlined />,
        roles:["admin","editor","guest"],
    },
    { 
        label: "图表",
        key: "/chart",
        icon: <AreaChartOutlined />,
        roles:["admin","editor","guest"],
        children: [
            { 
                label: "折线图",
                key: "/chart/line",
                roles:["admin","editor","guest"],
            },
            { 
                label: "柱状图",
                key: "/chart/bar",
                roles:["admin","editor","guest"],
            },
            { 
                label: "饼状图",
                key: "/chart/pie",
                roles:["admin","editor","guest"],
            },
            { 
                label: "键盘图",
                key: "/chart/key-board",
                roles:["admin","editor","guest"],
            },
            { 
                label: "混合图表",
                key: "/chart/mix",
                roles:["admin","editor","guest"],
            },
            { 
                label: "全国地图",
                key: '/chart/china',
                roles:["admin","editor","guest"],
            }
        ]
    },
    { 
        label: "组件",
        key: "/module",
        icon: <AppstoreOutlined />,
        roles:["admin","editor","guest"],
        children: [
            { 
                label: "Excel",
                key: "/module/excel",
                roles:["admin","editor","guest"],
            },
            { 
                label: "Zip",
                key: "/module/zip",
                roles:["admin","editor","guest"],
            },
            { 
                label: "Pdf",
                key: "/module/pdf",
                roles:["admin","editor","guest"],
            },
            { 
                label: "文件管理",
                key: "/module/file-admin",
                roles:["admin","editor","guest"],
            },
            { 
                label: "富文本",
                key: "/module/rich-text",
                roles:["admin","editor","guest"],
            },
            { 
                label: "MarkDown",
                key: "/module/mark-down",
                roles:["admin","editor","guest"],
            }
        ]
    },
    { 
        label: "权限测试",
        key: "/authority",
        icon: <EyeInvisibleOutlined />,
        roles:["admin","editor","guest"],
    },
    { 
        label: "错误页面",
        key: "/error",
        icon: <StopOutlined />,
        roles:["admin","editor","guest"],
        children: [
            { 
                label: "权限不足",
                key: "/error/no-authority",
                roles:["admin","editor","guest"],
            },
            { 
                label: "页面丢失",
                key: "/error/not-found",
                roles:["admin","editor","guest"],
            },
            { 
                label: "服务器错误",
                key: "/error/server-error",
                roles:["admin","editor","guest"],
            }
        ]
    }
];

export default menuList;