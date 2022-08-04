import React from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import menuList from "@/router/menuList";

const BreadCrumb = (props) => {
  const { location } = props;
  let { pathname } = location;
  if (pathname === "/") pathname = "/home";
  const handleBreadCrumb = (menuList, pathname) => {
    const temporaryPath = [];
    try {
      function getNodePath(node) {
        temporaryPath.push(node);
        // 找到目标节点直接返回
        if (node.key === pathname) {
          throw new Error("GOT IT!");
        }
        if (node.children && node.children.length > 0) {
          for (let index = 0; index < node.children.length; index++) {
            getNodePath(node.children[index]);
          }
          // 遍历完children所有节点没找到
          temporaryPath.pop();
        } else {
          // 没找到弹出压入的节点
          temporaryPath.pop();
        }
      }
      for (let index = 0; index < menuList.length; index++) {
        getNodePath(menuList[index]);
      }
    } catch (error) {
      return temporaryPath;
    }
  };
  let pathData = handleBreadCrumb(menuList, pathname);
  if (pathData[0].label !== "首页") {
    pathData = [{ label: "首页", key: "/home" }].concat(pathData);
  }
  return (
    <Breadcrumb className="h-full flex items-center ml-4 text-sm">
      {pathData.map((item) =>
        item.label === "首页" ? (
          <Breadcrumb.Item key={item.key}>
            <a href={`#${item.key}`}>{item.label}</a>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
        )
      )}
    </Breadcrumb>
  );
};

export default withRouter(BreadCrumb);
