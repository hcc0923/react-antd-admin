import React from 'react';
import {
    DashboardOutlined,
    TeamOutlined,
    UserOutlined, 
    BookOutlined,
    KeyOutlined,
    CopyOutlined,
    SettingOutlined,
    UserSwitchOutlined,
    ControlOutlined,
    StopOutlined,
    AreaChartOutlined,
    LineChartOutlined,
    BarChartOutlined,
    PieChartOutlined,
    DotChartOutlined,
    HeatMapOutlined,
    FileExclamationOutlined,
    FileOutlined,
    FileExcelOutlined,
    AppstoreOutlined,
    FileZipOutlined,
    FilePdfOutlined,
    FileDoneOutlined,
    FileTextOutlined,
    FileMarkdownOutlined,
    StockOutlined,
    CopyrightOutlined,
    EyeInvisibleOutlined,
    WarningOutlined,
    IssuesCloseOutlined
} from '@ant-design/icons';
const menuList = [
    {
        path: 'dashboard', 
        name: '首页', 
        icon: <DashboardOutlined />,
        roles: ["user", "admin", "root"]
    },
    { 
        path: 'user-menu',
        name: '用户管理', 
        icon: <UserOutlined />,
        roles: ["admin", "root"],
        children: [
            { 
                path: 'user-list',
                name: '用户列表', 
                icon: <TeamOutlined />,
                roles: ["admin", "root"]
            },
            { 
                path: 'role-list',
                name: '角色列表',
                icon: <UserOutlined />,
                roles: ["root"]
            }
        ]
    },
    { 
        path: 'setting-menu',
        name: '设置管理',
        icon: <SettingOutlined />,
        roles: ["user", "admin", "root"],
        children: [
            {
                path: 'user-setting',
                name: '用户设置',
                icon: <UserSwitchOutlined />,
                roles: ["user", "admin", "root"],
                children: [
                    { 
                        path: 'basic-info',
                        name: '基本资料',
                        icon: <BookOutlined />,
                        roles: ["user", "admin", "root"]
                    },
                    { 
                        path: 'modify-password',
                        name: '修改密码',
                        icon: <KeyOutlined />,
                        roles: ["user", "admin", "root"]
                    }
                ]
            },
            {
                path: 'system-setting',
                name: '系统设置',
                icon: <ControlOutlined />,
                roles: ["user", "admin", "root"]
            }
        ]
    },
    { 
        path: 'icon-list', 
        name: '图标',
        icon: <CopyOutlined />,
        roles: ["user", "admin", "root"]
    },
    { 
        path: 'chart',
        name: '图表',
        icon: <AreaChartOutlined />,
        roles: ["user", "admin", "root"],
        children: [
            { 
                path: 'line',
                name: '折线图', 
                icon: <LineChartOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'bar',
                name: '柱状图',
                icon: <BarChartOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'pie',
                name: '饼状图',
                icon: <PieChartOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'key-board',
                name: '键盘图',
                icon: <DotChartOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'mix',
                name: '混合图表',
                icon: <HeatMapOutlined />,
                roles: ["user", "admin", "root"]
            }
        ]
    },
    { 
        path: 'module',
        name: '组件', 
        icon: <AppstoreOutlined />,
        roles: ["user", "admin", "root"],
        children: [
            { 
                path: 'excel',
                name: 'Excel', 
                icon: <FileExcelOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'zip',
                name: 'Zip',
                icon: <FileZipOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'pdf',
                name: 'Pdf',
                icon: <FilePdfOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'udfile',
                name: '上传下载文件',
                icon: <FileDoneOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'rich-text',
                name: '富文本',
                icon: <FileTextOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'mark-down',
                name: 'MarkDown',
                icon: <FileMarkdownOutlined />,
                roles: ["user", "admin", "root"]
            }
        ]
    },
    { 
        path: 'permission',
        name: '权限测试', 
        icon: <EyeInvisibleOutlined />,
        roles: ["user", "admin", "root"],
        children: [
            { 
                path: 'authority',
                name: '权限切换', 
                icon: <WarningOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: 'page',
                name: '权限页面',
                icon: <IssuesCloseOutlined />,
                roles: ["user", "admin", "root"]
            }
        ]
    },
    { 
        path: 'error-page',
        name: '错误页面', 
        icon: <StopOutlined />,
        roles: ["user", "admin", "root"],
        children: [
            { 
                path: '401',
                name: '401', 
                icon: <FileExclamationOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: '404',
                name: '404',
                icon: <FileOutlined />,
                roles: ["user", "admin", "root"]
            },
            { 
                path: '500',
                name: '500',
                icon: <FileExcelOutlined />,
                roles: ["user", "admin", "root"]
            }
        ]
    },
    { 
        path: 'epidemic-map',
        name: '疫情地图',
        icon: <StockOutlined />,
        roles: ["user", "admin", "root"]
    },
    { 
        path: 'about', 
        name: '关于' ,
        icon: <CopyrightOutlined />,
        roles: ["user", "admin", "root"]
    }
];
export default menuList;