import React from "react";
import { connect } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { setCollapse } from "@/store/actions/settings";

const Hamburger: React.FC = (props: any) => {
  const { settings, setCollapse } = props;
  const { collapsed } = settings;
  return (
    <div
      id="hamburger"
      className="h-full flex items-center cursor-pointer text-2xl -ml-8"
      onClick={() => setCollapse(!collapsed)}
    >
      {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
};

const mapStateToProps = (state: object) => state;
const mapDispatchToProps = (dispatch: any) => ({
  setCollapse: (data: boolean) => {
    dispatch(setCollapse(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);
