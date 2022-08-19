import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Card, Select, Image, Empty } from "antd";
import { setUserInfo } from "@/store/actions/user";
import logo from "@/assets/logo.svg";
import vite from "@/assets/vite.svg";

const Authority = (props) => {
  const { user, setUserInfo } = props;
  const { userInfo } = user;
  const roleMap = { 1: "用户", 2: "管理员", 3: "超级管理员" };
  const intl = useIntl();
  const formatMessage = (id) => {
    return intl.formatMessage({ id });
  };
  const onSelectChange = (value) => {
    setUserInfo({ ...userInfo, role: value });
  };
  const roleOptions = [
    { label: "authority.options_role_user", value: 1 },
    { label: "authority.options_role_admin", value: 2 },
    { label: "authority.options_role_root", value: 3 },
  ];
  return (
    <Card title="权限切换">
      <div className="flex flex-col items-center">
        <div>
          你当前的权限是：
          <span className="text-sm font-bold">{roleMap[userInfo.role]}</span>
        </div>
        <div className="mt-8">
          <Select
            className="w-28"
            defaultValue={userInfo.role}
            onChange={onSelectChange}
          >
            {roleOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {formatMessage(option.label)}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        {userInfo.role > 2 ? (
          <>
            <Image alt="logo" width={300} height={300} src={logo} />
            <Image alt="logo" width={300} height={300} src={vite} />
          </>
        ) : userInfo.role > 1 ? (
          <Image alt="logo" width={300} height={300} src={logo} />
        ) : (
          <Empty description={false} imageStyle={{ width: 300, height: 300 }} />
        )}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => {
    dispatch(setUserInfo(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Authority);
