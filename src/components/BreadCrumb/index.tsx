import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Breadcrumb } from "antd";
import menuList from "@/router/menuList";

type ArrayObjectType = Array<object>;
const BreadCrumb: React.FC = (props: any) => {
  const { settings } = props;
  const settingsIntl = settings.intl;
  const location = useLocation();
  let { pathname } = location;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  if (pathname === "/") pathname = "/home";
  const homeLabel = settingsIntl === "zh" ? "首页" : "Home";
  const handleBreadCrumb = (menuList: ArrayObjectType, pathname: string) => {
    const temporaryPath: ArrayObjectType = [];
    try {
      function getNodePath(node: any) {
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
  let pathData: any = handleBreadCrumb(menuList, pathname);
  const formatLable = formatMessage(pathData[0].label.props.id);
  if (formatLable !== homeLabel) {
    pathData = [{ label: homeLabel, key: "/home" }].concat(pathData);
  }
  return (
    <Breadcrumb className="h-full flex items-center ml-4 text-sm">
      {pathData.map((item: any) =>
        item.label === homeLabel ? (
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

const mapStateToProps = (state: object) => state;

export default connect(mapStateToProps)(BreadCrumb);
