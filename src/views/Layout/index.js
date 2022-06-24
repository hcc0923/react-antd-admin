import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { setCollapse, setTheme } from '@/store/actions/setting';
import TopHeader from "./TopHeader";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import BottomFooter from "./BottomFooter";


class LayoutContainer extends Component {
    state = { visible: false };
    render() { 
        // 父组件向子组件分发数据和方法
        const { collapse, theme, userInfo } = this.props;
        const { setCollapse, setTheme } = this.props;
        return (
            <Layout hasSider>
                <TopHeader
                    theme={theme}
                    setTheme={setTheme}
                    userInfo={userInfo}
                />
                <SideMenu
                    theme={theme}
                    collapse={collapse}
                    userInfo={userInfo}
                    setCollapse={setCollapse}
                />
                {/* ml-28 */}
                <Layout className="site-layout ml-56 mt-24">
                    <MainContent renderRoutes={this.props.route.routes} />
                    <BottomFooter />
                </Layout>
            </Layout>
        );
    };
};


const mapStateToProps = (state) => state;
const mapDispatchToProps = dispatch => ({
	setCollapse: data => {
		dispatch(setCollapse(data));
	},
	setTheme: data => {
		dispatch(setTheme(data));
	}
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);