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
    const onSettingChange = (settings) => {
        props.setSettings(settings)
    }
    const [routers, setRouters] = useState([]);
    

    const resolveFn = (menu, path) => {
      menu.forEach(item => {
        if (item.path === path) {
          return item.name;
        }
        resolveFn(item.routes, path);
      })
    }
    const onInitBreadCrumb = () => {
      const { pathname } = location;
      const pathNames = pathname.split('/').slice(1);
      let pathStr = '';
      const mergedPaths = pathNames.map(path => pathStr += `/${path}`);
      console.log(mergedPaths);
      
      mergedPaths.forEach(path => {
        const pathName = resolveFn(sideMenu, path);
        console.log(pathName);
      })
      // pathNames.forEach(pathname => {
      //   const newBreadCrumb = {
      //     path: `#/${pathname}`,
      //     breadcrumbName: itemNames[index]
      //   };
      // })
    }


    const onClickMenuItem = (menuItem) => {
      setRouters([]);
      console.log(menuItem);
      const { path, locale, pro_layout_parentKeys } = menuItem;
      const itemNames = locale.split('.').slice(1);
      pro_layout_parentKeys.push(path);
      pro_layout_parentKeys.forEach((path, index) => {
        const newBreadCrumb = {
          path: `#${path}`,
          breadcrumbName: itemNames[index]
        };
        routers.push(newBreadCrumb);
      });
      console.log(routers);
      setRouters(routers);
    }
    useEffect(() => {
      onInitBreadCrumb();
    }, []);
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
                ...routers
              ]}
              waterMarkProps={{ content: 'react-antd-admin' }}  
              menuItemRender={(menuItem, dom) => (<Link to={menuItem.path} onClick={onClickMenuItem.bind(this, menuItem)}>{dom}</Link>)} 
              // menuItemRender={(menuItem, dom) => onClick(menuItem){dom})} 
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