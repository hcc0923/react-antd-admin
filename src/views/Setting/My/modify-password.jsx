import React, { useState } from 'react';
import { 
    Card, 
    Form, 
    Input, 
    Button, 
    Space, 
    Spin, 
    message 
} from 'antd';
import CryptoJS from 'crypto-js'; 


const { $http } = React;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 20,
    },
};

const ModifyPassword = (props) => {
    const [spinning, setSpinning] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [verifyPassword, setVerifyPassword] = useState(false);

    const handleVerifyPassword = (event) => {
        setIsFirst(false);
        const value = event.target.value;
        if (value === '') return message.error('当前密码不能为空');

        setSpinning(true);
        const params = { password: CryptoJS.MD5(value).toString() };
        $http.get('/user/verifyPassword', {params})
            .then(() => {
                setVerifyPassword(true);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setSpinning(false);
            });
    }
    const handleSubmit = (values) => {
        setSpinning(true);
        const params = { newPassword: CryptoJS.MD5(values.newPassword).toString() };
        $http.put('/user/updatePassword', params)
            .then(() => {
                message.success('修改成功，请重新登录');
                localStorage.clear();
                props.history.push('/login');
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setSpinning(false);
            });
    }
    
    return (  
        <Spin spinning={spinning}>
            <Card title="修改密码">
                <Form
                    {...layout}
                    name="update"
                    initialValues={{ password: '', repeatPassword: '' }}
                    onFinish={(values) => handleSubmit(values)}
                >
                        <Form.Item 
                            label="当前密码"
                            name="password"
                            hasFeedback
                            validateStatus={isFirst ? '' : verifyPassword ? 'success' : 'error'}
                            rules={[
                                {
                                    min: 6, 
                                    max: 12
                                },
                                {
                                    required: true, 
                                    message: '请输入你的密码!'
                                },
                            ]}
                        >
                            <Input.Password onBlur={(event) => handleVerifyPassword(event)} />
                        </Form.Item>
                        <span style={{marginLeft: '17%', color: '#999'}}>密码长度在不少于六位</span>
                        <Form.Item 
                            label="新密码" 
                            name="newPassword" 
                            hasFeedback 
                            rules={[
                                {
                                    min: 6, 
                                    max: 12
                                },
                                { 
                                    required: true, 
                                    message: '请输入你的新密码!'
                                },
                            ]}
                        >
                                <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="确认新密码"
                            name="repeatNewPassword"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    min: 6, 
                                    max: 12
                                },
                                {
                                    required: true,
                                    message: '请再次输入密码!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('两次输入密码不一致!');
                                    }
                                })]}
                            >
                                <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Space size={20}>
                                <Button type="primary" htmlType="submit">保存</Button>
                            </Space>
                        </Form.Item>
                </Form>
            </Card>
        </Spin>
    );
}

export default ModifyPassword;