import React from "react";
import logo from "@/assets/logo.svg";
import "./index.less";

const Logo: React.FC = () => {
  return (
    <div className="sidebar-logo-container">
      <img src={logo} className="sidebar-logo" alt="logo" />
    </div>
  );
};

export default Logo;
