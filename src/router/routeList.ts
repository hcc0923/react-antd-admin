import React from "react";

const routeList = [
  {
    path: "/home",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Home/index")),
  },
  {
    path: "/user-menu/user-list",
    roles: ["root", "admin"],
    component: React.lazy(() => import("@/views/User/user-list")),
  },
  {
    path: "/setting-menu/user-setting/basic-info",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Setting/My/basic-info")),
  },
  {
    path: "/setting-menu/user-setting/modify-password",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Setting/My/modify-password")),
  },
  {
    path: "/icon",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Icon/index")),
  },
  {
    path: "/chart/line",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Chart/line")),
  },
  {
    path: "/chart/bar",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Chart/bar")),
  },
  {
    path: "/chart/pie",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Chart/pie")),
  },
  {
    path: "/chart/key-board",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Chart/key-board")),
  },
  {
    path: "/chart/mix",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Chart/mix")),
  },
  {
    path: "/chart/water",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Chart/water")),
  },
  {
    path: "/chart/china",
    roles: ["root", "admin"],
    component: React.lazy(() => import("@/views/Chart/china")),
  },
  {
    path: "/module/excel",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/excel")),
  },
  {
    path: "/module/zip",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/zip")),
  },
  {
    path: "/module/file-admin",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/file-admin")),
  },
  {
    path: "/module/rich-text",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/rich-text")),
  },
  {
    path: "/module/mark-down",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/mark-down")),
  },
  {
    path: "/module/type-effect",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/type-effect")),
  },
  {
    path: "/module/qrcode",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/qrcode")),
  },
  {
    path: "/module/player",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/player")),
  },
  {
    path: "/module/pdf-preview",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Module/pdf-preview")),
  },
  {
    path: "/authority",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Authority/index")),
  },
  {
    path: "/error/no-authority",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Error/no-authority")),
  },
  {
    path: "/error/not-found",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Error/not-found")),
  },
  {
    path: "/error/server-error",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Error/server-error")),
  },
  {
    path: "*",
    roles: ["root", "admin", "user"],
    component: React.lazy(() => import("@/views/Error/not-found")),
  },
];

export default routeList;
