import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
    Form, 
    Input, 
    Button, 
    message 
} from "antd";
import CryptoJS from "crypto-js";
import { EMAIL_KEY } from '@/utils/config';


const { $http } = React;
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 16,
    },
};

function Forget() {
    const [formType, setFormType] = useState('validate');
    const [validateForm, setValidateForm] = useState({ email: '', code: '' });
    const [resetForm, setResetForm] = useState({ password: '', repeatPassword: '' });
    const [codeText, setCodeText] = useState('获取验证码');
    const [disabled, setDisabled] = useState(false);
    const [authCode, setAuthCode] = useState(0);
    
    const handleInputChange = (event, formType, name) => {
        if (formType === 'validate') {
            validateForm[name] = event.target.value;
            setValidateForm(validateForm);
        } else {
            resetForm[name] = event.target.value;
            setResetForm(resetForm);
        }
    }
    const handleValidateEmail = (event) => {
        const params = {};
        params.email = event.target.value;
        $http.get('/login/findEmail', {params})
            .then(response => {
                const { result } = response;
                if (result.length === 0) {
                    setDisabled(true)
                    return message.error('邮箱还未注册，请先注册');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleAuthEmailCode = () => {
        if (!validateForm.email || !EmailRegexp.test(validateForm.email)) {
            return message.error('请输入正确的邮箱');
        }
        const params = {};
        params.email = validateForm.email;
        $http.get('/login/sendEmail', { params })
            .then(response => {
                const authCode = CryptoJS.AES.decrypt(response.userAuthCode, EMAIL_KEY).toString(CryptoJS.enc.Utf8);
                setAuthCode(authCode);

                let second = 59;
                let timer = null;
                message.success('验证码已发送到邮箱，请注意查收');
                setDisabled(true);
                setCodeText(`${second}秒后重新获取`);
                timer = setInterval(() => {
                    second -= 1;
                    setCodeText(`${second}秒后重新获取`);
                    if (second === 0) {
                        clearInterval(timer);
                        setDisabled(false);
                        setCodeText('获取验证码');
                    };
                }, 1000);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleFindPassword = () => {
        if (validateForm.code !== authCode.toString()) {
            return message.error('验证码不正确');
        }
        localStorage.setItem('validateEmail', validateForm.email);
        setFormType('reset');
        setValidateForm({ email: '', code: '' });
    }
    const handleResetPassword = () => {
        const cryptoPassword = CryptoJS.MD5(this.state.resetForm.password).toString();
        const params = {
            email: localStorage.getItem('validateEmail'),
            password: cryptoPassword
        }
        $http.put('/login/resetPassword', params)
            .then(() => {
                message.success('密码重置成功，请到重新登录账号');
                localStorage.removeItem('validateEmail');
                this.props.history.push('/login');
            })
            .catch((error) => {
                message.error(error);
            });
    }
    return (  
        <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="flex w-1/5 h-1/2 bg-slate-50 shadow-2xl overflow-hidden rounded-xl">
                <div className={`w-full ${formType === 'reset' ? 'hidden' : ''}`}>
                    <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">忘记密码</h1>
                    <Form
                        {...layout}
                        name="basic"
                        className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
                        initialValues={validateForm}
                        onFinish={() => handleFindPassword()}>
                            <Form.Item
                                label="邮箱"
                                name="email"
                                className="p-3 w-full"
                                rules={[
                                    {
                                        required: true,
                                        message: '邮箱不能为空!',
                                    },
                                    {
                                        pattern: EmailRegexp,
                                        message: '邮箱格式不正确!',
                                    }
                                ]}
                                onChange={(event) => handleInputChange(event, 'validate', 'email')}
                                onBlur={(event) => handleValidateEmail(event)}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                name="code"
                                className="p-3 w-full"
                                rules={[
                                    {
                                        required: true,
                                        message: '验证码不能为空!',
                                    }
                                ]}
                                onChange={(event) => handleInputChange(event, 'validate', 'code')}>
                                <section className="flex">
                                    <Input className="mr-0" />
                                    <Button 
                                        type="primary" 
                                        disabled={disabled}  
                                        className={`w-25 text-xs px-1 py-0 ml-3 ${disabled ? 'disabled:opacity-50 disabled' : ''}`} 
                                        onClick={() => handleAuthEmailCode()}>
                                        {codeText}
                                    </Button>
                                </section>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">找回密码</Button>
                            </Form.Item>
                            <Link to="/login" className="mx-0 my-1 text-gray-300">已有账号，去登录</Link>
                    </Form>
                </div>
                <div className={`w-full ${formType === 'validate' ? 'hidden' : ''}`}>
                    <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">重置密码</h1>
                    <Form
                        {...layout}
                        name="basic"
                        className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
                        initialValues={resetForm}
                        onFinish={() => handleResetPassword()}>
                            <Form.Item
                                label="密码"
                                name="password"
                                className="p-3 w-full"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不能为空!',
                                    },
                                    {
                                        min: 6,
                                        message: '密码长度不能少于六位!',
                                    },
                                ]}
                                onChange={(event) => handleInputChange(event, 'reset', 'password')}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="repeatPassword"
                                className="p-3 w-full"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不能为空!',
                                    },
                                    {
                                        validator: (_, value) => 
                                        value === resetForm.password ? Promise.resolve() : Promise.reject('两次输入的密码不一致!')
                                    },
                                ]}
                                onChange={(event) => handleInputChange(event, 'reset', 'repeatPassword')}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">重置新密码</Button>
                            </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Forget;