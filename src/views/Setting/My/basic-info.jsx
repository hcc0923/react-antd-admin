import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Spin,
  Card,
  Form,
  Input,
  Button,
  Space,
  Radio,
  Upload,
  message,
} from "antd";
import Uploading from "@/components/Uploading";
import { getUserDetail, updateUser } from "@/api/user";
import { setUserInfo } from "@/store/actions/user";
import { SERVER_ADDRESS } from "@/utils/config";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PhoneRegexp =
  /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

const BasicInfo = (props) => {
  const { user } = props;
  const { userInfo } = user;
  const [spinning, setSpinning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const formRef = useRef();
  const initialForm = {
    id: 0,
    username: "",
    gender: 0,
    avatar: "",
    phone: "",
    email: "",
    remark: "",
  };

  const handleBeforeUpload = (file) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error("只能上传JPG/PNG文件!");
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error("图片大小不能超过2MB!");
      return false;
    }
    return true;
  };
  const handleAvatarChange = (avatar) => {
    setUploading(true);
    const { file } = avatar;
    const { status } = file;
    switch (status) {
      case "uploading":
        return setUploading(true);
      case "done":
        const { path } = file.response.file;
        setAvatarUrl(path);
        return setUploading(false);
      case "error":
        return setUploading(false);
      default:
        break;
    }
  };
  const handleSubmitForm = (values) => {
    setSpinning(true);
    values["avatar"] = avatarUrl;
    updateUser(values)
      .then(() => {
        message.success("保存成功");
      })
      .catch((error) => {
        message.error("保存失败");
        console.log(error);
      })
      .finally(() => {
        setSpinning(false);
      });
  };
  const handleResetForm = () => {
    const id = formRef.current.getFieldValue("id");
    setAvatarUrl("");
    formRef.current.resetFields();
    formRef.current.setFieldsValue({ id });
  };
  const handleGetUserDetail = () => {
    setSpinning(true);
    getUserDetail(userInfo.id)
      .then((result) => {
        const data = result.result[0];

        setAvatarUrl(data.avatar);
        formRef.current.setFieldsValue(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSpinning(false);
      });
  };
  useEffect(() => {
    handleGetUserDetail();
  }, []);

  return (
    <Spin spinning={spinning}>
      <Card title="基本资料">
        <Form
          {...layout}
          name="basicinfo"
          ref={formRef}
          initialValues={initialForm}
          onFinish={handleSubmitForm}
        >
          <span style={{ marginLeft: "17%", color: "#999" }} className="ml-1/6">
            不可修改。用户的唯一标识。
          </span>
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
          <Form.Item label="头像" name="avatar" valuePropName="avatar">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action={SERVER_ADDRESS + "/file/uploadAvatar"}
              beforeUpload={handleBeforeUpload}
              onChange={handleAvatarChange}
            >
              {avatarUrl ? (
                <img
                  src={SERVER_ADDRESS + "/" + avatarUrl}
                  alt="获取头像失败"
                  className="w-full h-full"
                />
              ) : (
                <Uploading uploading={uploading} />
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="手机"
            name="phone"
            rules={[
              {
                pattern: PhoneRegexp,
                message: "手机格式不正确",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                pattern: EmailRegexp,
                message: "邮箱格式不正确",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={4} placeholder="请输入内容" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space size={20}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button htmlType="button" onClick={handleResetForm}>
                重新填写
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => {
    dispatch(setUserInfo(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
