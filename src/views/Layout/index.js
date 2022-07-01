import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Avatar, Button, Descriptions, Space, Statistic, Layout } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import sideMenu from '@/routes/sideMenu';
import { renderRoutes } from "react-router-config";
import { TransitionGroup, CSSTransition } from 'react-transition-group';



import { setPrimaryColor } from '@/store/actions/setting';


const content = (<Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>);

// eslint-disable-next-line import/no-anonymous-default-export
function App(props) {
    const [settings, setSetting] = useState({ fixSiderbar: false });
    // console.log(props);
    function setPathname(path) {
        console.log(path);
        props.history.push(`${path}`)
    }
    function showProps(settings) {
        setSetting(settings)
        const { primaryColor } = settings;
        props.setPrimaryColor(primaryColor)
        console.log(props);
    }
    return (
        <div style={{ height: '100vh' }}>
            <ProLayout 
            {...sideMenu} 
            location={ '/' } 
            waterMarkProps={{ content: '水印功能' }}  
            onMenuHeaderClick={(e) => console.log(e)} 
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            menuItemRender={(item, dom) => (<a onClick={() => { setPathname(item.path) }}>{dom}</a>)} 
            rightContentRender={() => ( <div><Avatar shape="square" size="small" icon={<UserOutlined />}/></div>)} 
            {...settings}
            >
            <PageContainer 
                content={content} 
                tabList={[
                {
                    tab: '基本信息',
                    key: 'base',
                },
                {
                    tab: '详细信息',
                    key: 'info',
                }]} 
                extraContent={<Space size={24}>
                    <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />}/>
                    <Statistic title="Unmerged" value={93} suffix="/ 100"/>
                </Space>} 
                extra={[
                    <Button key="3">操作</Button>,
                    <Button key="2">操作</Button>,
                    <Button key="1" type="primary">主操作</Button>
                ]} 
                footer={[<p key="1" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: '100%' }} ><span>AAA</span></p>]}>
                    <TransitionGroup>
                        <CSSTransition classNames="fade" timeout={500}>
                            {renderRoutes(props.route.routes)}
                        </CSSTransition>
                    </TransitionGroup>
            </PageContainer>
        </ProLayout>

        <SettingDrawer 
        enableDarkTheme 
        settings={settings}
        onSettingChange={(changeSetting) => showProps(changeSetting)} 
        disableUrlParams={true}/>
        </div>

    );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setPrimaryColor: data => {
		dispatch(setPrimaryColor(data));
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(App);