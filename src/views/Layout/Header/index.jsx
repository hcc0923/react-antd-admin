import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  message,
  Layout,
} from "antd";
import {
  DownOutlined,
  SettingOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import FullScreen from "@/components/FullScreen";
import DrawerSettings from "@/components/DrawerSettings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import { setFixedHeader } from "@/store/actions/setting";
import { SERVER_ADDRESS } from "@/utils/config";
import "./index.less";


const Header = (props) => {
  const { user, collapse, fixedHeader } = props;
  const { userInfo } = user;
  const [drawerVisible, setDrawerVisible] = useState(false);
 
  const onLogout = () => {
    localStorage.clear();
    message.success("退出成功，请重新登录");
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a href="#/setting-menu/user-setting/basic-info">基本资料</a>,
        },
        {
          key: "2",
          label: (
            <a href="#/setting-menu/user-setting/modify-password">修改密码</a>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: (
            <a href="/" onClick={() => onLogout()}>
              退出
            </a>
          ),
        },
      ]}
    />
  );
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (collapse.collapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };

  return (
    <>
      {fixedHeader ? <Layout.Header /> : null}
      <Layout.Header
        style={computedStyle()}
        className={fixedHeader ? "fixed top-0 right-0 z-10" : ""}
      >
        <div className="flex justify-between w-full">
          <div className="flex justify-start items-center">
            <Hamburger />
            <BreadCrumb />
          </div>
          <div className={"h-16 flex justify-end items-center mr-4"}>
            <div className="h-full flex justify-between items-center text-2xl">
              <FullScreen />
              <TranslationOutlined className="ml-4" />
              <SettingOutlined
                className="mx-4 cursor-default"
                onClick={() => setDrawerVisible(true)}
              />
            </div>
            <div className="h-full flex justify-between items-center">
              <Avatar src={`${SERVER_ADDRESS}/${userInfo?.avatar}`} />
              <Dropdown overlay={menu} placement="bottom" arrow>
                <Button type="link">
                  <span className="text-lg">{userInfo?.username}</span>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
          <DrawerSettings 
            drawerVisible={drawerVisible}
            fixedHeader={fixedHeader}
            setDrawerVisible={setDrawerVisible}
          />
        </div>
      </Layout.Header>
    </>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setFixedHeader: (data) => {
    dispatch(setFixedHeader(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
