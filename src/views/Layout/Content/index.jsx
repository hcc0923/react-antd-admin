import React, { Suspense } from 'react';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import { Layout } from 'antd';
import routeList from '@/router/routeList';
import { formatRole } from '@/utils';


const Content = (props) => {
    const { location, user } = props;
    const { pathname } = location;
    const { userInfo } = user;
    const filterComponent = (route) => {
        return !route.roles || route.roles.includes(formatRole(userInfo.role));
    };

    return (
        <Layout.Content 
            style={{ height: "calc(100% - 100px)", width: "100%", padding: '1rem' }}
        >
            <TransitionGroup>
                <CSSTransition
                    key={pathname}
                    timeout={500}
                    classNames="fade"
                    exit={false}
                >
                    <Switch location={location}>
                        <Redirect exact from="/" to="/home" />
                        <Suspense fallback={<></>}>
                            {
                                routeList.map((route) => {
                                    return (
                                        filterComponent(route) && (
                                            <Route
                                                component={route.component}
                                                key={route.path}
                                                path={route.path}
                                            />
                                        )
                                    );
                                })
                            }
                        </Suspense>
                        <Redirect to="/error/not-found" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Layout.Content>
    );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Content));