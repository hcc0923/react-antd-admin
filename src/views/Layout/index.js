import { useState } from 'react';
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
  SettingDrawer 
} from '@ant-design/pro-components';
import { LikeOutlined } from '@ant-design/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import sideMenu from '@/routes/sideMenu';
import { setPrimaryColor } from '@/store/actions/setting';
import TopRightContent from './TopRightContent';
import PageContainerContent from './PageContainerContent';


function App(props) {
    const [settings, setSetting] = useState({ fixSiderbar: false });
    function onSettingChange(settings) {
        setSetting(settings)
        const { primaryColor } = settings;
        props.setPrimaryColor(primaryColor)
    }
    return (
        <div style={{ height: '100vh' }}>
            <ProLayout 
              route={{ routes: sideMenu }}
              waterMarkProps={{ content: 'react-antd-admin' }}  
              onMenuHeaderClick={(e) => console.log(e)} 
              menuItemRender={(menuItem, dom) => (<Link to={menuItem.path}>{dom}</Link>)} 
              rightContentRender={() => <TopRightContent />} 
              {...settings}
            >
              <PageContainer 
                content={<PageContainerContent />} 
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
	setPrimaryColor: data => {
		dispatch(setPrimaryColor(data));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);