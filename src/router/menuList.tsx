import React from "react";
import { FormattedMessage } from "react-intl";
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

const menuList: Array<object> = [
  {
    label: <FormattedMessage id="menulist.home" />,
    key: "/home",
    icon: <DashboardOutlined />,
    roles: ["root", "admin", "user"],
  },
  {
    label: <FormattedMessage id="menulist.user_menu" />,
    key: "/user-menu",
    icon: <UserOutlined />,
    roles: ["root", "admin"],
    children: [
      {
        label: <FormattedMessage id="menulist.user_list" />,
        key: "/user-menu/user-list",
        icon: <UserOutlined />,
        roles: ["root", "admin"],
      },
    ],
  },
  {
    label: <FormattedMessage id="menulist.setting_menu" />,
    key: "/setting-menu",
    icon: <SettingOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: <FormattedMessage id="menulist.user_setting" />,
        key: "/setting-menu/user-setting",
        roles: ["root", "admin", "user"],
        children: [
          {
            label: <FormattedMessage id="menulist.basic_info" />,
            key: "/setting-menu/user-setting/basic-info",
            roles: ["root", "admin", "user"],
          },
          {
            label: <FormattedMessage id="menulist.modify_password" />,
            key: "/setting-menu/user-setting/modify-password",
            roles: ["root", "admin", "user"],
          },
        ],
      },
    ],
  },
  {
    label: <FormattedMessage id="menulist.icon" />,
    key: "/icon",
    icon: <CopyOutlined />,
    roles: ["root", "admin", "user"],
  },
  {
    label: <FormattedMessage id="menulist.chart" />,
    key: "/chart",
    icon: <AreaChartOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: <FormattedMessage id="menulist.chart.line" />,
        key: "/chart/line",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.chart.bar" />,
        key: "/chart/bar",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.chart.pie" />,
        key: "/chart/pie",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.chart.key_board" />,
        key: "/chart/key-board",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.chart.mix" />,
        key: "/chart/mix",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.chart.water" />,
        key: "/chart/water",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.chart.china" />,
        key: "/chart/china",
        roles: ["root", "admin"],
      },
    ],
  },
  {
    label: <FormattedMessage id="menulist.module" />,
    key: "/module",
    icon: <AppstoreOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: <FormattedMessage id="menulist.module.excel" />,
        key: "/module/excel",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.module.zip" />,
        key: "/module/zip",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.module.file_admin" />,
        key: "/module/file-admin",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.module.rich_text" />,
        key: "/module/rich-text",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.module.mark_down" />,
        key: "/module/mark-down",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.module.type_effect" />,
        key: "/module/type-effect",
        roles: ["root", "admin", "user"],
      },
    ],
  },
  {
    label: <FormattedMessage id="menulist.authority" />,
    key: "/authority",
    icon: <EyeInvisibleOutlined />,
    roles: ["root", "admin", "user"],
  },
  {
    label: <FormattedMessage id="menulist.error" />,
    key: "/error",
    icon: <StopOutlined />,
    roles: ["root", "admin", "user"],
    children: [
      {
        label: <FormattedMessage id="menulist.error.no_authority" />,
        key: "/error/no-authority",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.error.not_found" />,
        key: "/error/not-found",
        roles: ["root", "admin", "user"],
      },
      {
        label: <FormattedMessage id="menulist.error.server_error" />,
        key: "/error/server-error",
        roles: ["root", "admin", "user"],
      },
    ],
  },
];

export default menuList;
