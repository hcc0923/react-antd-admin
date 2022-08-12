import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { Layout } from "antd";
import routeList from "@/router/routeList";
import { formatRole } from "@/utils";

const Content = (props) => {
  const { user } = props;
  const { userInfo } = user;
  const handleFilterComponent = (route) => {
    console.log(route);
    return route;
    // return !route.roles || route.roles.includes(formatRole(userInfo.role));
  };

  return (
    <Layout.Content
      style={{ height: "calc(100% - 100px)", width: "100%", padding: "1rem" }}
    >
      
          

         
      
      
    </Layout.Content>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Content);
