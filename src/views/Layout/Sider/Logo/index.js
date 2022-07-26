import React from "react";
import logo from "@/assets/images/logo.svg";
import "./index.less";


const Logo = () => {
  return (
    <div className="sidebar-logo-container">
      <img src={logo} className="sidebar-logo" alt="logo" />
    </div>
  );
}

export default Logo;