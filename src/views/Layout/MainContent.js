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
                     style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                      }}
                            className="site-layout-background"
                          >
                            <div
                                className="site-layout-background"
                                style={{
                                padding: 24,
                                textAlign: 'center',
                                }}
                            >
                                {renderRoutes(this.props.renderRoutes)}
                            </div>
                        
                    </Layout.Content>
                </CSSTransition>
            </TransitionGroup>
        );
    };
};
export default withRouter(MainContent);