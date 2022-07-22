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


function Header(props) {
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
        <div className="h-16 flex justify-end items-center">
            <div className="h-full flex justify-between items-center text-2xl">
                <FullScreen />
                <TranslationOutlined className="mx-4"/>
            </div>
            <div className="h-full flex justify-between items-center">
                <Avatar src={`${SERVER_ADDRESS}/${userInfo.avatar}`} />
                <Dropdown overlay={menu} placement="bottom" arrow>
                    <Button type="link">
                        <span className="text-lg">{userInfo.username}</span>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);