import React from "react";

const routeList = [
  {
    path: "/home",
    component: React.lazy(() => import("@/views/Home/index")),
  },
  {
    path: "/user-menu/user-list",
    component: React.lazy(() => import("@/views/User/user-list")),
  },
  {
    path: "/setting-menu/user-setting/basic-info",
    component: React.lazy(() => import("@/views/Setting/My/basic-info")),
  },
  {
    path: "/setting-menu/user-setting/modify-password",
    component: React.lazy(() => import("@/views/Setting/My/modify-password")),
  },
  {
    path: "/icon",
    component: React.lazy(() => import("@/views/Icon/index")),
  },
  {
    path: "/chart/line",
    component: React.lazy(() => import("@/views/Chart/line")),
  },
  {
    path: "/chart/bar",
    component: React.lazy(() => import("@/views/Chart/bar")),
  },
  {
    path: "/chart/pie",
    component: React.lazy(() => import("@/views/Chart/pie")),
  },
  {
    path: "/chart/key-board",
    component: React.lazy(() => import("@/views/Chart/key-board")),
  },
  {
    path: "/chart/mix",
    component: React.lazy(() => import("@/views/Chart/mix")),
  },
  {
    path: "/chart/china",
    component: React.lazy(() => import("@/views/Chart/china")),
  },
  {
    path: "/module/excel",
    component: React.lazy(() => import("@/views/Module/excel")),
  },
  {
    path: "/module/zip",
    component: React.lazy(() => import("@/views/Module/zip")),
  },
  {
    path: "/module/file-admin",
    component: React.lazy(() => import("@/views/Module/file-admin")),
  },
  {
    path: "/module/rich-text",
    component: React.lazy(() => import("@/views/Module/rich-text")),
  },
  {
    path: "/module/mark-down",
    component: React.lazy(() => import("@/views/Module/mark-down")),
  },
  {
    path: "/module/type-effect",
    component: React.lazy(() => import("@/views/Module/type-effect")),
  },
  {
    path: "/authority",
    component: React.lazy(() => import("@/views/Authority/index")),
  },
  {
    path: "/error/no-authority",
    component: React.lazy(() => import("@/views/Error/no-authority")),
  },
  {
    path: "/error/not-found",
    component: React.lazy(() => import("@/views/Error/not-found")),
  },
  {
    path: "/error/server-error",
    component: React.lazy(() => import("@/views/Error/server-error")),
  },
];

export default routeList;
