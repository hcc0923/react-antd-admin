import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import DocumentTitle from "react-document-title";
import { Layout, Menu } from "antd";
import Logo from "@/components/Logo";
import menuList from "@/router/menuList";
import { setCollapse } from "@/store/actions/settings";
import { addTag } from "@/store/actions/tag";
import { formatRole } from "@/utils";

type ArrayObjectType = Array<object>;
const Sider = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, settings, setCollapse, addTag } = props;
  const { pathname } = location;
  const { userInfo } = user;
  const { collapsed } = settings;
  const [menuPermission, setMenuPermission] = useState<any>([]);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const [documentTitle, setDocumentTitle] = useState("");
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const onCollapse = (collapsed: boolean) => {
    setCollapse(collapsed);
  };
  const handleAuthMenuItem = (item: any) => {
    const { roles } = item;
    if (!roles || roles.includes(formatRole(userInfo.role))) {
      return true;
    }
    return false;
  };
  const handleMenuPermission = (menuList: ArrayObjectType) => {
    const menuData: ArrayObjectType = [];
    menuList.forEach((item: any) => {
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
  const openKeysData: ArrayObjectType = [];
  const handleOpenKeys = (menuList: ArrayObjectType) => {
    menuList.forEach((item: any) => {
      if (item.children) {
        const cItem = item.children.find(
          (child: any) => pathname.indexOf(child.key) === 0
        );
        if (cItem) {
          openKeysData.push(item.key);
          handleOpenKeys(item.children);
        }
      }
    });
  };
  const handleFindMenuItemByKey = (
    menuList: ArrayObjectType,
    key: string
  ): any => {
    return menuList.find((item: any) => {
      if (item.key === key) {
        return item;
      } else {
        if (item.children) {
          return handleFindMenuItemByKey(item.children, key);
        }
      }
    });
  };
  const handleDocumentTitle = (menuList: ArrayObjectType, pathKey: string) => {
    const menuItem = handleFindMenuItemByKey(menuList, pathKey);
    const lableId = menuItem.label.props.id;
    setDocumentTitle(formatMessage(lableId));
  };
  const handleSelectMenu = (data: any) => {
    const { key } = data;
    const menuItem = handleFindMenuItemByKey(menuList, key);
    handleDocumentTitle(menuList, key);
    addTag({ label: menuItem.label.props.id, key });
    navigate(key);
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
            onSelect={handleSelectMenu}
          />
        </div>
      </Layout.Sider>
    </DocumentTitle>
  );
};

const mapStateToProps = (state: object) => state;
const mapDispatchToProps = (dispatch: any) => ({
  setCollapse: (data: boolean) => {
    dispatch(setCollapse(data));
  },
  addTag: (data: object) => {
    dispatch(addTag(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sider);
