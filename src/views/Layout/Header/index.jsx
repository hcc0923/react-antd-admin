import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Layout,
  Menu,
  Dropdown,
  Space,
  Avatar,
  Button,
  Tooltip,
  message,
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
import { setIntl } from "@/store/actions/settings";
import { SERVER_ADDRESS } from "@/utils/config";

const Header = (props) => {
  const { user, settings, setIntl } = props;
  const { userInfo } = user;
  const { collapsed, fixedHeader } = settings;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMb = document.body.clientWidth <= 992;
  const [mobile, setMobile] = useState(isMb);

  const handleLogout = () => {
    localStorage.clear();
    message.success("退出成功，请重新登录");
  };
  const intlMenu = (
    <Menu
      onClick={(event) => setIntl(event.key)}
      items={[
        {
          key: "en",
          label: "English",
        },
        {
          key: "zh",
          label: "中文",
        },
      ]}
    />
  );
  const systemMenu = (
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
  const handleResizeEvent = () => {
    const addResizeEvent = () => {
      const isMb = document.body.clientWidth <= 992;
      setMobile(isMb);
    };
    window.addEventListener("resize", addResizeEvent);
  };
  useEffect(() => {
    handleResizeEvent();
  }, []);
  return (
    <>
      {fixedHeader ? <Layout.Header /> : null}
      <Layout.Header
        style={{
          ...computedStyle(),
          transition: "width 0.2s",
          zIndex: 9,
          height: 64,
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        }}
        className={fixedHeader ? "fixed top-0 right-0" : ""}
      >
        <div className="flex justify-between w-full">
          <div className="flex justify-start items-center">
            {mobile ? null : <Hamburger />}
            {mobile ? null : <BreadCrumb />}
          </div>
          <div className={"h-16 flex justify-end items-center mr-12"}>
            <div className="h-full flex justify-between items-center text-2xl">
              <FullScreen />

              <Dropdown overlay={intlMenu} placement="bottom" arrow>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <TranslationOutlined className="ml-4" />
                  </Space>
                </a>
              </Dropdown>

              <Tooltip placement="bottom" title={"系统设置"}>
                <SettingOutlined
                  className="mx-4 cursor-default"
                  onClick={() => setDrawerVisible(true)}
                />
              </Tooltip>
            </div>
            <div className="h-full flex justify-between items-center">
              <Avatar src={`${SERVER_ADDRESS}/${userInfo.avatar}`} />
              <Dropdown overlay={systemMenu} placement="bottom" arrow>
                <Button type="link">
                  <span className="text-lg">{userInfo.username}</span>
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
  setIntl: (data) => {
    dispatch(setIntl(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
