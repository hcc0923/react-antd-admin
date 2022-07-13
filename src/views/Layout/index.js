import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { 
  Space, 
  Statistic, 
} from 'antd';
import { 
  ProLayout,
  PageContainer, 
  SettingDrawer,
  ProBreadcrumb 
} from '@ant-design/pro-components';
import { LikeOutlined } from '@ant-design/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import sideMenu from '@/routes/sideMenu';
import { setSettings } from '@/store/actions/setting';
import TopRightContent from './TopRightContent';
import PageContainerContent from './PageContainerContent';


function App(props) {
    const { settings, location } = props;
    const { pathname } = location;
    const [breadCrumb, setBreadCrumb] = useState([]);
    const onSettingChange = (settings) => {
        props.setSettings(settings)
    }
    const breadCrumbdData = [];
    const hnadleNewBreadCrumb = (menu, path) => {
      menu.forEach(item => {
        if (item.path === path) {
          const newBreadCrumb = {
            path: `#${path}`,
            breadcrumbName: item.name
          }; 
          breadCrumbdData.push(newBreadCrumb);
        } else {
          if (item.routes) {
            hnadleNewBreadCrumb(item.routes, path);
          }
        }
      }); 
    }
    const handleInitBreadCrumb = () => {
      const pathNames = pathname.split('/').slice(1);
      let pathStr = '';
      const mergedPaths = pathNames.map(path => pathStr += `/${path}`);
      
      mergedPaths.forEach(path => {
        hnadleNewBreadCrumb(sideMenu, path);
      });
      setBreadCrumb(breadCrumbdData);
    }

    useEffect(() => {
      handleInitBreadCrumb();
    }, [pathname]);
    return (
        <div className="h-screen">
            <ProLayout 
              title="react-antd-admin"
              logo={<></>}
              route={{ routes: sideMenu }}
              headerContentRender={() => <ProBreadcrumb />}
              breadcrumbRender={() => [
                {
                  path: '/',
                  breadcrumbName: '首页',
                },
                ...breadCrumb
              ]}
              waterMarkProps={{ content: 'react-antd-admin' }}  
              menuItemRender={(menuItem, dom) => (<Link to={menuItem.path}>{dom}</Link>)} 
              rightContentRender={() => <TopRightContent />} 
              {...settings}
            >
              <PageContainer 
                content={<PageContainerContent />} 
                breadcrumbRender={false}
                extraContent={
                  <Space size={24}>
                      <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />}/>
                      <Statistic title="Unmerged" value={93} suffix="/ 100"/>
                  </Space>
                } 
              >
                  <TransitionGroup>
                      <CSSTransition classNames="fade" timeout={500}>
                          {renderRoutes(props.route.routes)}
                      </CSSTransition>
                  </TransitionGroup>
              </PageContainer>
            </ProLayout>
            <SettingDrawer 
              hideHintAlert
              hideCopyButton
              enableDarkTheme 
              settings={settings}
              onSettingChange={(settings) => onSettingChange(settings)} 
              disableUrlParams={true}
            />
        </div>
    );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setSettings: data => {
		dispatch(setSettings(data));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);