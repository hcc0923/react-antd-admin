import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "@/views/Layout";
import Login from "@/views/Login/login";

function Router(props) {
  const { user } = props;
  const { userInfo } = user;

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          path="/"
          render={() => {
            if (!user.token) {
              return <Redirect to="/login" />;
            } else {
              if (userInfo.role) {
                return <Layout />;
              }
            }
          }}
        />
      </Switch>
    </HashRouter>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Router);
