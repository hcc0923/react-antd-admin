import React, { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Button, Dropdown, Menu, message, Layout } from "antd";
import {
  DownOutlined,
  SettingOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import FullScreen from "@/components/FullScreen";
import DrawerSettings from "@/components/DrawerSettings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import { SERVER_ADDRESS } from "@/utils/config";

const Header = (props) => {
  const { user, collapsed, settings } = props;
  const { userInfo } = user;
  const { fixedHeader } = settings;
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
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
            <a href="/" onClick={() => handleLogout()}>
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
      if (collapsed) {
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
        style={{
          ...computedStyle(),
          transition: "width 0.3s",
          zIndex: 1,
          height: 64,
          backgroundColor: "white",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
        }}
        className={fixedHeader ? "fixed top-0 right-0" : ""}
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

export default connect(mapStateToProps)(Header);
