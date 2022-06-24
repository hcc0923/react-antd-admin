import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { setCollapse, setTheme, setBreadcrumb, setTag } from '@/store/actions/setting';
import { addBreadCrumb } from '@/store/actions/breadCrumb';
import { addTag, removeTag } from '@/store/actions/tagList';
import TopHeader from "./TopHeader";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import BottomFooter from "./BottomFooter";
import TagList from './TagList';
import BreadCrumb from "./BreadCrumb";
import './style.less';


class LayoutContainer extends Component {
    state = { visible: false };
    render() { 
        // 父组件向子组件分发数据和方法
        const { collapse, theme, userInfo, breadcrumb, breadCrumb, tag, tagList } = this.props;
        const { setCollapse, setTheme, setBreadcrumb, setTag, addBreadCrumb, addTag, removeTag } = this.props;
        return (
            <HashRouter>
                <div className="layout bg-red-700">
                    <Layout>
                        {/* 通栏头部 */}
                        <TopHeader
                            theme={theme}
                            setTheme={setTheme}
                            breadcrumb={breadcrumb}
                            setBreadcrumb={setBreadcrumb}
                            tag={tag}
                            setTag={setTag}
                            userInfo={userInfo}>
                        </TopHeader>
                        <Layout>
                            {/* 侧边栏 */}
                            <SideMenu
                                theme={theme}
                                collapse={collapse}
                                userInfo={userInfo}
                                setCollapse={setCollapse}
                                addBreadCrumb={addBreadCrumb}
                                addTag={addTag}>
                            </SideMenu>
                            <Layout style={{ padding: '0 12px' }}>
                                {/* 面包屑 */}
                                { 
                                    breadcrumb.show ? 
                                    <BreadCrumb
                                        breadCrumb={breadCrumb}>
                                    </BreadCrumb>
                                    : 
                                    <div style={{padding: '0'}}></div>
                                }

                                {/* 标签 */}
                                { 
                                    tag.show ?
                                    <TagList 
                                        tagList={tagList}
                                        removeTag={removeTag}>
                                    </TagList>
                                    :
                                    <div style={{padding: '0'}}></div>
                                }

                                {/* 内容 */}
                                <MainContent
                                    renderRoutes={this.props.route.routes}>
                                </MainContent>
                                
                                {/* 底部 */}
                                <BottomFooter></BottomFooter>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>
            </HashRouter>  
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
	},
	setBreadcrumb: data => {
		dispatch(setBreadcrumb(data));
    },
    addBreadCrumb: data => {
        dispatch(addBreadCrumb(data));
    },
	setTag: data => {
		dispatch(setTag(data));
    },
    addTag: data => {
		dispatch(addTag(data));
    },
    removeTag: data => {
        dispatch(removeTag(data));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);