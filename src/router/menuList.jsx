import React from "react";
import {
  DashboardOutlined,
  UserOutlined,
  CopyOutlined,
  SettingOutlined,
  StopOutlined,
  AreaChartOutlined,
  AppstoreOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    label: "menulist.home",
    key: "/home",
    icon: <DashboardOutlined />,
    roles: ["root", "admin", "user"],
  },
  {
    label: "menulist.user_menu",
    key: "/user-menu",
    icon: <UserOutlined />,
    roles: ["root", "admin"],
    children: [
      {
        label: "menulist.user_list",
        key: "/user-menu/user-list",
        icon: <UserOutlined />,
        roles: ["root", "admin"],
      },
    ],
  },
  {
    label: "menulist.setting_menu",
    key: "/setting-menu",
    icon: <SettingOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: "menulist.user_setting",
        key: "/setting-menu/user-setting",
        roles: ["root", "admin", "user"],
        children: [
          {
            label: "menulist.basic_info",
            key: "/setting-menu/user-setting/basic-info",
            roles: ["root", "admin", "user"],
          },
          {
            label: "menulist.modify_password",
            key: "/setting-menu/user-setting/modify-password",
            roles: ["root", "admin", "user"],
          },
        ],
      },
    ],
  },
  {
    label: "menulist.icon",
    key: "/icon",
    icon: <CopyOutlined />,
    roles: ["root", "admin", "user"],
  },
  {
    label: "menulist.chart",
    key: "/chart",
    icon: <AreaChartOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: "menulist.chart.line",
        key: "/chart/line",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.chart.bar",
        key: "/chart/bar",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.chart.pie",
        key: "/chart/pie",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.chart.key_board",
        key: "/chart/key-board",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.chart.mix",
        key: "/chart/mix",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.chart.china",
        key: "/chart/china",
        roles: ["root", "admin"],
      },
    ],
  },
  {
    label: "menulist.module",
    key: "/module",
    icon: <AppstoreOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: "menulist.module.excel",
        key: "/module/excel",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.module.zip",
        key: "/module/zip",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.module.file_admin",
        key: "/module/file-admin",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.module.rich_text",
        key: "/module/rich-text",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.module.mark_down",
        key: "/module/mark-down",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.module.type_effect",
        key: "/module/type-effect",
        roles: ["root", "admin", "user"],
      },
    ],
  },
  {
    label: "menulist.authority",
    key: "/authority",
    icon: <EyeInvisibleOutlined />,
    roles: ["root", "admin", "user"],
  },
  {
    label: "menulist.error",
    key: "/error",
    icon: <StopOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: "menulist.error.no_authority",
        key: "/error/no-authority",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.error.not_found",
        key: "/error/not-found",
        roles: ["root", "admin", "user"],
      },
      {
        label: "menulist.error.server_error",
        key: "/error/server-error",
        roles: ["root", "admin", "user"],
      },
    ],
  },
];

export default menuList;
