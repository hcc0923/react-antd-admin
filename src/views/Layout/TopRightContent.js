import React from 'react';
import { 
    Avatar, 
    Button, 
    Dropdown, 
    Menu,
    message
} from 'antd';
import { DownOutlined, TranslationOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import FullScreen from '@/components/FullScreen';
import { SERVER_ADDRESS } from '@/utils/config';


function TopRightContent(props) {
    const { userInfo } = props;
    const onLogout = () => {
        localStorage.clear();
        message.success('退出成功，请重新登录');
    }
    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a href="#/setting-menu/user-setting/basic-info">
                  基本资料
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a href="#/setting-menu/user-setting/modify-password">
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
                <a href='/' onClick={() => onLogout()}>
                  退出
                </a>
              ),
            },
          ]}
        />
    );
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-between items-start">
                {/* full screen */}
                <div className="h-full text-2xl cursor-pointer mr-4">
                    <FullScreen />
                </div>
                {/* more language */}
                <div className="h-full text-2xl mr-4">
                    <TranslationOutlined />
                </div>
            </div>
            {/* person info */}
            <div className="h-full flex justify-between items-center">
                <Avatar src={`${SERVER_ADDRESS}/${userInfo.avatar}`} style={{ marginTop: 4 }} />
                <Dropdown overlay={menu} placement="bottom" arrow>
                    <Button type="link">
                        <span className="text-xl">{userInfo.username}</span>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(TopRightContent);