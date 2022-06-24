import React, { Component } from 'react';
import { Layout } from 'antd';
import  { withRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class MainContent extends Component {
    state = {};
    render() { 
        return (  
            <TransitionGroup>
                <CSSTransition classNames="fade" timeout={500}>
                    <Layout.Content
                            className="site-layout-background"
                            style={{
                                paddingTop: 0,
                                margin: 0,
                                minHeight: 280,
                            }}>
                        {renderRoutes(this.props.renderRoutes)}
                    </Layout.Content>
                </CSSTransition>
            </TransitionGroup>
        );
    };
};
export default withRouter(MainContent);