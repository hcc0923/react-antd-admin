import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Layout, Menu } from "antd";
import Logo from "@/components/Logo";
import menuList from "@/router/menuList";
import { setCollapse } from "@/store/actions/settings";
import { addTag } from "@/store/actions/tag";
import { formatRole } from "@/utils";

const Sider = (props) => {
  const { location, history, user, settings, setCollapse, addTag } = props;
  const { pathname } = location;
  const { userInfo } = user;
  const { collapsed } = settings;
  const [menuPermission, setMenuPermission] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [documentTitle, setDocumentTitle] = useState("");

  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };
  const handleAuthMenuItem = (item) => {
    const { roles } = item;
    if (!roles || roles.includes(formatRole(userInfo.role))) {
      return true;
    }
    return false;
  };
  const handleMenuPermission = (menuList) => {
    const menuData = [];
    menuList.forEach((item) => {
      if (handleAuthMenuItem(item)) {
        menuData.push(item);
        if (item.children) {
          const children = handleMenuPermission(item.children);
          item.children = children;
        }
      }
    });
    return menuData;
  };
  const openKeysData = [];
  const handleOpenKeys = (menuList) => {
    menuList.forEach((item) => {
      if (item.children) {
        const cItem = item.children.find(
          (child) => pathname.indexOf(child.key) === 0
        );
        if (cItem) {
          openKeysData.push(item.key);
          handleOpenKeys(item.children);
        }
      }
    });
  };
  const handleMenuSelect = (data) => {
    const { key, domEvent } = data;
    setDocumentTitle(domEvent.target.innerText);
    addTag({ label: domEvent.target.innerText, key });
    history.push(key);
  };
  const handleDocumentTitle = (menuList, pathname) => {
    menuList.forEach((item) => {
      if (item.key === pathname) {
        setDocumentTitle(item.label);
      } else {
        if (item.children) {
          handleDocumentTitle(item.children, pathname);
        }
      }
    });
  };
  useEffect(() => {
    const menuData = handleMenuPermission(menuList);
    setMenuPermission(menuData);
  }, []);
  useEffect(() => {
    handleOpenKeys(menuList);
    setOpenKeys(openKeysData);
    handleDocumentTitle(menuList, pathname);
  }, [pathname]);

  return (
    <DocumentTitle title={documentTitle}>
      <Layout.Sider
        theme={"dark"}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ overflow: "auto", height: "100vh" }}
      >
        {settings.showLogo ? <Logo /> : null}
        <div style={{ height: "calc(100% - 64px)" }}>
          <Menu
            mode="inline"
            theme="dark"
            items={menuPermission}
            defaultOpenKeys={openKeys}
            openKeys={openKeys}
            selectedKeys={[pathname]}
            onOpenChange={setOpenKeys}
            onSelect={handleMenuSelect}
          />
        </div>
      </Layout.Sider>
    </DocumentTitle>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setCollapse: (data) => {
    dispatch(setCollapse(data));
  },
  addTag: (data) => {
    dispatch(addTag(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sider));
