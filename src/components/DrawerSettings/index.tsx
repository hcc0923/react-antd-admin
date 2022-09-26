import React from "react";
import { connect } from "react-redux";
import { Drawer, Switch, Space, Button, Divider } from "antd";
import { useIntl } from "react-intl";
import {
  setFixedHeader,
  setShowLogo,
  setShowTag,
} from "@/store/actions/settings";

const DrawerSettings = (props: any) => {
  const {
    drawerVisible,
    setDrawerVisible,
    settings,
    setFixedHeader,
    setShowLogo,
    setShowTag,
  } = props;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  return (
    <Drawer
      title={formatMessage("drawsettings.title")}
      closeIcon={<></>}
      placement="right"
      visible={drawerVisible}
      headerStyle={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
      extra={
        <Space>
          <Button type="primary" onClick={() => setDrawerVisible(false)}>
            OK
          </Button>
        </Space>
      }
    >
      <div className="flex justify-between items-center">
        <span>{formatMessage("drawsettings.fixed_header")}</span>
        <Switch
          checkedChildren={formatMessage("drawsettings.open")}
          unCheckedChildren={formatMessage("drawsettings.close")}
          defaultChecked={settings.fixedHeader}
          onChange={(checked) => setFixedHeader(checked)}
        />
      </div>
      <Divider dashed />

      <div className="flex justify-between items-center">
        <span>{formatMessage("drawsettings.show_logo")}</span>
        <Switch
          checkedChildren={formatMessage("drawsettings.open")}
          unCheckedChildren={formatMessage("drawsettings.close")}
          defaultChecked={settings.showLogo}
          onChange={(checked) => setShowLogo(checked)}
        />
      </div>
      <Divider dashed />

      <div className="flex justify-between items-center">
        <span>{formatMessage("drawsettings.show_tag")}</span>
        <Switch
          checkedChildren={formatMessage("drawsettings.open")}
          unCheckedChildren={formatMessage("drawsettings.close")}
          defaultChecked={settings.showTag}
          onChange={(checked) => setShowTag(checked)}
        />
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state: object) => state;
const mapDispatchToProps = (dispatch: any) => ({
  setFixedHeader: (data: boolean) => {
    dispatch(setFixedHeader(data));
  },
  setShowLogo: (data: boolean) => {
    dispatch(setShowLogo(data));
  },
  setShowTag: (data: boolean) => {
    dispatch(setShowTag(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerSettings);
