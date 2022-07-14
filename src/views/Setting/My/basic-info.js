import React, { useState, useEffect, useRef } from 'react';
import { 
    Card, 
    Form, 
    Input, 
    Button, 
    Space, 
    Radio, 
    Upload, 
    message 
} from "antd";
import { 
    LoadingOutlined, 
    PlusOutlined 
} from "@ant-design/icons";
import { SERVER_ADDRESS } from '@/utils/config';
import { setUserInfo } from "@/store/actions/userInfo";
import store from '@/store/store';
import { debounce } from "@/utils/optimize";


const { $http } = React;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16
    }
};
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PhoneRegexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

function BasicInfo() {
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const formRef = useRef();
    const initialForm = { id: 0, username: '', gender: 0, avatar: '', phone: '', email: '', remark: '' };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) message.error('只能上传JPG/PNG文件!');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) message.error('图片大小不能超过2MB!');
        return isJpgOrPng && isLt2M;
    }
    const handleChange = (info) => {
        const file = info.file;
        
        if (file.status === 'uploading') setLoading(true);
        if (file.status === 'done') {
            const { id } = JSON.parse(localStorage.getItem('userInfo'));
            const { path } = file.response.file;

            // 上传成功把用户上传的文件和用户信息写入数据库
            $http.put('/user/uploadAvatar', {id, avatar: path})
                .then(() => {
                    setAvatarUrl(path)
                    setLoading(false);
                })
                .catch(error => {
                    message.error('上传失败');
                    console.log(error);
                });
        }
        if (file.status === 'error') {
            message.error('上传失败');
            setLoading(false);
        }
    }
    const handleSubmit = (values) => {
        debounce(() => {
            values['avatar'] = avatarUrl;
            $http.put('/user/updateUser', values)
                .then(() => {
                    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
                    userInfo['username'] = values['username'];
                    userInfo['avatar'] = avatarUrl;

                    const action = setUserInfo(userInfo);
                    store.dispatch(action);

                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    message.success('保存成功');
                })
                .catch(error => {
                    message.error('保存失败');
                    console.log(error);
                });
        }, 500)();
    }
    const handleReset = () => {
        const id = formRef.current.getFieldValue("id");
        setAvatarUrl('');
        formRef.current.resetFields();
        formRef.current.setFieldsValue({ id });
    }
    const getUserDetail = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        $http.get('/user/getUserDetail/' + userInfo.id)
            .then(result => {
                const data = result.result[0];

                setAvatarUrl(data.avatar);
                formRef.current.setFieldsValue(data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        getUserDetail();
    }, []);
    
    return (  
        <Card title="基本资料">
            <Form
                {...layout}
                name="basicinfo"
                ref={formRef}
                initialValues={initialForm}
                onFinish={(values) => handleSubmit(values)}>
                    <span style={{marginLeft: '17%', color: '#999'}} className="ml-1/6">不可修改。用户的唯一标识。</span>
                    <Form.Item label="ID" name="id">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="用户名" name="username">
                    <Input />
                    </Form.Item>
                    <Form.Item label="性别" name="gender">
                        <Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item 
                        label="头像"
                        name="avatar"
                        valuePropName="avatar">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                action={SERVER_ADDRESS + '/file/uploadAvatar'}
                                beforeUpload={(file) => beforeUpload(file)}
                                onChange={(info) => handleChange(info)}>
                                    {
                                        avatarUrl ? 
                                        <img src={SERVER_ADDRESS + '/' + avatarUrl} alt="avatar" style={{ width: '100%' }} /> 
                                        : 
                                        <div>
                                            {
                                                loading ? 
                                                <LoadingOutlined /> 
                                                : 
                                                <PlusOutlined />
                                            }
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    }
                            </Upload>
                    </Form.Item>
                    <Form.Item label="手机" name="phone" rules={[{pattern: PhoneRegexp, message: '手机格式不正确'}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email" rules={[{pattern: EmailRegexp, message: '邮箱格式不正确'}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input.TextArea rows={4} placeholder="请输入内容" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space size={20}>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button htmlType="button" onClick={() => handleReset()}>重新填写</Button>
                        </Space>
                    </Form.Item>
            </Form>
        </Card>
    );
}

export default BasicInfo;