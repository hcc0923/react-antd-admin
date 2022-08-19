import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Login from "@/views/Login/login";
import Forget from "@/views/Login/forget";
import Layout from "@/views/Layout";
import routeList from "@/router/routeList";
import { formatRole } from "@/utils";

function Router(props) {
  const { user } = props;
  const { userInfo } = user;
  const handleFilterComponent = (route) => {
    return route.roles.includes(formatRole(userInfo.role));
  };
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        {user.token ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            {routeList.map((route) => {
              return (
                handleFilterComponent(route) && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                )
              );
            })}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        )}
      </Routes>
    </HashRouter>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Router);
