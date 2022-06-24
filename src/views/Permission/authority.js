import React, { Component } from 'react';
import { Card, Select } from 'antd';


class Authority extends Component {
    state = JSON.parse(localStorage.getItem('userInfo')) || {};
    roleToAuth = (role) => {
        switch (role) {
            case 1:
                return "用户";
            case 2:
                return "管理员";
            case 3:
                return "超级管理员";
            default:
                break;
        }
    };
    onSelectChange = (value) => {
        const roleName = this.roleToAuth(value);
        this.setState({
            role: value,
            roleName
        }, () => {
            delete this.state.roleName;
            localStorage.setItem('userInfo', JSON.stringify(this.state));
            window.location.reload();
        });
    };
    componentDidMount() {
        const roleName = this.roleToAuth(this.state.role);
        this.setState({ 
            role: this.state.role,
            roleName 
        });
    };
    render() { 
        const { role, roleName } = this.state;
        return (  
            <Card title="权限切换">
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <section>
                        你当前的权限是：
                        <span style={{fontSize: '14px', fontWeight: 'bolder', color: '#1DA57A'}}>{roleName}</span>
                    </section>
                    <section style={{marginTop: '23px'}}>
                        <Select defaultValue={role} style={{ width: 120 }} onChange={this.onSelectChange}>
                            <Select.Option value={1}>用户</Select.Option>
                            <Select.Option value={2}>管理员</Select.Option>
                            <Select.Option value={3}>超级管理员</Select.Option>
                        </Select>
                    </section>
                </div>
            </Card>
        );
    };
};
export default Authority;