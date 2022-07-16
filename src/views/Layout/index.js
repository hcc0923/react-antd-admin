import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { connect } from 'react-redux';
import { 
  Spin,
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
    const [breadCrumb, setBreadCrumb] = useState([]);
    const [dashboard, setDashboard] = useState(false);
    const [locationPathName, setLocationPathName] = useState(localStorage.getItem('pathname') || '/');
    const { route: renderRoute, settings, location } = props;
    const breadCrumbdData = [];

    const onSettingChange = (settings) => {
      props.setSettings(settings)
    }
    const handleNewBreadCrumb = (menu, path) => {
      menu.forEach(item => {
        if (item.path === path) {
          const newBreadCrumb = {
            path: `#${path}`,
            breadcrumbName: item.name
          }; 
          breadCrumbdData.push(newBreadCrumb);
        } else {
          if (item.routes) {
            handleNewBreadCrumb(item.routes, path);
          }
        }
      }); 
    }
    const handleInitBreadCrumb = () => {
      const pathNames = location['pathname'].split('/').slice(1);
      let pathStr = '';
      const mergedPaths = pathNames.map(path => pathStr += `/${path}`);

      mergedPaths.forEach(path => {
        if (path === '/dashboard') {
          const newBreadCrumb = {
            path: '',
            breadcrumbName: ''
          }; 
          breadCrumbdData.push(newBreadCrumb);
          setDashboard(true);
        } else {
          setDashboard(false);
          handleNewBreadCrumb(sideMenu, path);
        }
      });
      setBreadCrumb(breadCrumbdData);
    }
    const onClickItem = (item) => {
      setLocationPathName(item);
      localStorage.setItem('pathname', item)
    }
    useEffect(() => {
      handleInitBreadCrumb();
    }, [locationPathName]);
    
    return (
      <Spin 
        spinning={false} 
        tip="Loading..." 
        size="large"
      >
        <ProLayout 
            style={{ height: '100%' }}
            title="react-antd-admin"
            logo={<></>}
            route={{ routes: sideMenu }}
            location={{
              pathname: locationPathName,
            }}
            headerContentRender={() => <ProBreadcrumb />}
            breadcrumbRender={() => [
              {
                path: '/',
                breadcrumbName: '首页',
              },
              ...breadCrumb
            ]}
            breadcrumbProps={dashboard ? { separator: '' } : {}}
            waterMarkProps={{ content: 'react-antd-admin' }}  
            menuItemRender={(menuItem, dom) => (<a href={`#${menuItem.path}`} onClick={() => onClickItem(menuItem.path || '/')}>{dom}</a>)} 
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
                        {renderRoutes(renderRoute.routes)}
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
      </Spin>
    );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setSettings: data => {
		dispatch(setSettings(data));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);