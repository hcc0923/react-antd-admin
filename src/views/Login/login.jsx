import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { 
    Form, 
    Input, 
    Button, 
    message 
} from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";
import { userLogin, userRegister } from '@/api/login';
import { setToken, setUserInfo } from "@/store/actions/user";
import { formatGMTTime } from '@/utils';


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

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({ isLogin: true, step: 100 });
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ email: '', password: '' });

    const toggleOverlay = (step) => {
        setOverlay({ isLogin: !overlay.isLogin, step });
    }
    const handleInputChange = (event, formType, labelName) => {
        if (formType === 'login') {
            loginForm[labelName] = event.target.value;
            setLoginForm(loginForm);
        } else {
            registerForm[labelName] = event.target.value;
            setRegisterForm(registerForm);
        }
    }
    const handleLogin = (values, isRegistered) => {
        setLoading(true);
        setLoginForm(values);
        const params = JSON.parse(JSON.stringify(loginForm));
        params['password'] = CryptoJS.MD5(params['password']).toString();
        
        userLogin(params)
            .then((response) => {
                console.log(response);
                const { token, userInfo } = response;
                
                const { last_login_time, last_login_ip } = userInfo;
                message.info(`上次登录时间：${formatGMTTime(last_login_time)} 上次登录IP：${last_login_ip}`, 13);

                props.setToken(token);
                props.setUserInfo(userInfo);
                localStorage.setItem('user', JSON.stringify({ token, userInfo }));
                
                if (isRegistered) message.destroy('loading');
                props.history.push('/home');
                message.success('登陆成功');
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const handleAuthRegistered = (event) => {
        const params = { email: event.target.value };

        userRegister(params)
            .then((response) => {
                const { result } = response;
                if (result.length !== 0) {
                    return message.error('该邮箱已注册，请登录');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleRegister = () => {
        setLoading(true);
        const params = JSON.parse(JSON.stringify(registerForm));
        params.password = CryptoJS.MD5(params.password).toString();

        userRegister(params)
            .then(() => {
                message.loading({ content: '注册成功，正在为你登录...', key: 'loading' });
                setLoginForm(registerForm);
                handleLogin(registerForm, true);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="flex w-2/5 h-1/2 bg-slate-50 relative shadow-2xl overflow-hidden rounded-xl">
                <div className="w-1/2">
                    <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">登录</h1>
                    <Form
                        {...layout}
                        name="basic"
                        className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
                        initialValues={loginForm}
                        onFinish={(values) => handleLogin(values)}
                    >
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
                            onChange={(event) => handleInputChange(event, 'login', 'email')}
                        >
                            <Input autoComplete="off"/>
                        </Form.Item>
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
                            onChange={(event) => handleInputChange(event, 'login', 'password')}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Link to="/forget" className="mx-0 my-1 text-black">忘记密码</Link>
                        <Form.Item {...tailLayout}>
                            <Button 
                                type="primary" 
                                disabled={loading ? true : false} 
                                htmlType="submit"
                            >
                                {
                                    loading ? 
                                    <LoadingOutlined className="mr-1" /> 
                                    : 
                                    null
                                }登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="w-1/2">
                    <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">注册</h1>
                    <Form
                        {...layout}
                        name="basic"
                        className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
                        initialValues={registerForm}
                        onFinish={() => handleRegister()}
                    >
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
                            onChange={(event) => handleInputChange(event, 'register', 'email')}
                            onBlur={(event) => handleAuthRegistered(event)}
                        >
                            <Input  autoComplete="off"/>
                        </Form.Item>
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
                                    message: '密码长度不能小于六位!',
                                },
                            ]}
                            onChange={(event) => handleInputChange(event, 'register', 'password')}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button 
                                type="primary" 
                                disabled={loading ? true : false} 
                                htmlType="submit"
                            >
                                {
                                    loading ? 
                                    <LoadingOutlined className="mr-1" /> 
                                    : 
                                    null
                                }注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="absolute w-1/2 h-full bg-green-800" style={{transform: 'translateX('+ overlay.step +'%)', transition: 'ease all 0.5s'}}>
                    {
                        overlay.isLogin ? 
                        <section className="flex flex-col justify-center items-center mt-36">
                            <h1 className="text-center text-white text-4xl font-bold">注册新账号！</h1>
                            <p className="text-white text-sm font-thin leading-5 tracking-wider mx-0 my-8">输入您的个人信息注册账号。</p>
                            <button className="border border-solid border-white rounded-2xl text-xs font-bold bg-green-700 px-12 py-3 text-white outline-none cursor-pointer" onClick={() => toggleOverlay(0)}>注册</button>
                        </section>
                        :
                        <section className="flex flex-col justify-center items-center mt-36">
                            <h1 className="text-center text-white text-4xl font-bold">欢迎回来！</h1>
                            <p className="text-white text-sm font-thin leading-5 tracking-wider mx-0 my-8">请您先登录的个人信息，进行操作。</p>
                            <button className="border border-solid border-white rounded-2xl text-xs font-bold bg-green-700 px-12 py-3 text-white outline-none cursor-pointer" onClick={() => toggleOverlay(100)}>登录</button>
                        </section>
                    }
                </div>
            </div>
        </div> 
    );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setToken: data => {
        dispatch(setToken(data));
    },
    setUserInfo: data => {
        dispatch(setUserInfo(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);