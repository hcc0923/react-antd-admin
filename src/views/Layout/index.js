import { LikeOutlined, TranslationOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { 
    Avatar, 
    Button, 
    Descriptions, 
    Space, 
    Statistic, 
    Dropdown, 
    Menu,
} from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';

import { renderRoutes } from "react-router-config";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FullScreen from '@/components/FullScreen';
import { 
    SettingOutlined,
    DownOutlined
} from "@ant-design/icons";

import { setPrimaryColor } from '@/store/actions/setting';

import TopHeader from './TopHeader'
import { SERVER_ADDRESS } from '@/utils/config';



const content = (<Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>);




const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            基本资料
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            修改密码
          </a>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            退出
          </a>
        ),
      },
    ]}
  />
);
const TopRightContent = (
    <div className="flex justify-between items-center">
        <div className="flex justify-between items-start">
            {/* full screen */}
            <div className="h-full text-2xl cursor-pointer mr-4">
                <FullScreen></FullScreen>
            </div>
            {/* more language */}
            <div className="h-full text-2xl mr-4">
                <TranslationOutlined />
            </div>
        </div>
       
        {/* person info */}
        <div className="h-full flex justify-between items-center ">
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'></Avatar>
            <Dropdown overlay={menu} placement="bottom" arrow>
                <Button  type="link">
                    <span className="text-xl">{'hcc'}</span>
                    <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    </div>
)
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
            route={{ routes: props.route.routes }}
            waterMarkProps={{ content: '水印功能' }}  
            onMenuHeaderClick={(e) => console.log(e)} 
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            menuItemRender={(item, dom) => (<a onClick={() => { setPathname(item.path) }}>{dom}</a>)} 
            rightContentRender={() => TopRightContent} 
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