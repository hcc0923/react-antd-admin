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
        key: "/",
        hidden: true,
        icon: <DashboardOutlined />,
        roles:["root","admin","user"]
    },
    {
        label: "首页",
        key: "/home",
        icon: <DashboardOutlined />,
        roles:["root","admin","user"]
    },
    {
        label: "用户管理",
        key: "/user-menu",
        icon: <UserOutlined />,
        roles:["root","admin"],
        children: [
            {
                label: "用户列表",
                key: "/user-menu/user-list",
                icon: <UserOutlined />,
                roles:["root","admin"],
            },
            {
                label: "角色列表",
                icon: <SettingOutlined />,
                key: "/user-menu/role-list",
                roles:["root"],
            },
        ],
    },
    {
        label: "设置管理",
        key: "/setting-menu",
        icon: <SettingOutlined />,
        roles:["root","admin","user"],
        children: [
            {
                label: "用户设置",
                key: "/setting-menu/user-setting",
                roles:["root","admin","user"],
                children: [
                    { 
                        label: "基本资料",
                        key: "/setting-menu/user-setting/basic-info",
                        roles:["root","admin","user"],
                    },
                    { 
                        label: "修改密码",
                        key: "/setting-menu/user-setting/modify-password",
                        roles:["root","admin","user"],
                    }
                ]
            }
        ]
    },
    { 
        label: "图标",
        key: "/icon", 
        icon: <CopyOutlined />,
        roles:["root","admin","user"],
    },
    { 
        label: "图表",
        key: "/chart",
        icon: <AreaChartOutlined />,
        roles:["root","admin","user"],
        children: [
            { 
                label: "折线图",
                key: "/chart/line",
                roles:["root","admin","user"],
            },
            { 
                label: "柱状图",
                key: "/chart/bar",
                roles:["root","admin","user"],
            },
            { 
                label: "饼状图",
                key: "/chart/pie",
                roles:["root","admin","user"],
            },
            { 
                label: "键盘图",
                key: "/chart/key-board",
                roles:["root","admin","user"],
            },
            { 
                label: "混合图表",
                key: "/chart/mix",
                roles:["root","admin","user"],
            },
            { 
                label: "全国地图",
                key: '/chart/china',
                roles:["root","admin","user"],
            }
        ]
    },
    { 
        label: "组件",
        key: "/module",
        icon: <AppstoreOutlined />,
        roles:["root","admin","user"],
        children: [
            { 
                label: "Excel",
                key: "/module/excel",
                roles:["root","admin","user"],
            },
            { 
                label: "Zip",
                key: "/module/zip",
                roles:["root","admin","user"],
            },
            { 
                label: "Pdf",
                key: "/module/pdf",
                roles:["root","admin","user"],
            },
            { 
                label: "文件管理",
                key: "/module/file-root",
                roles:["root","admin","user"],
            },
            { 
                label: "富文本",
                key: "/module/rich-text",
                roles:["root","admin","user"],
            },
            { 
                label: "MarkDown",
                key: "/module/mark-down",
                roles:["root","admin","user"],
            }
        ]
    },
    { 
        label: "权限测试",
        key: "/authority",
        icon: <EyeInvisibleOutlined />,
        roles:["root"],
    },
    { 
        label: "错误页面",
        key: "/error",
        icon: <StopOutlined />,
        roles:["root","admin","user"],
        children: [
            { 
                label: "权限不足",
                key: "/error/no-authority",
                roles:["root","admin","user"],
            },
            { 
                label: "页面丢失",
                key: "/error/not-found",
                roles:["root","admin","user"],
            },
            { 
                label: "服务器错误",
                key: "/error/server-error",
                roles:["root","admin","user"],
            }
        ]
    }
];

export default menuList;