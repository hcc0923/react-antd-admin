import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Space, Radio, Upload, message } from "antd";
import { useIntl } from "react-intl";
import { useRequest } from "ahooks";
import Uploading from "@/components/Uploading";
import SpinCard from "@/components/SpinCard";
import { getUserDetail, updateUser } from "@/api/user";
import { setUserInfo } from "@/store/actions/user";
import { EmailRegexp, PhoneRegexp } from "@/utils";
import { SERVER_ADDRESS } from "@/utils/config";

type UserDataType = {
  avatar: string;
  email: string;
  gender: number;
  id: number;
  phone: string;
  remark: string;
  role: number;
  username: string;
};
type FileType = {
  type: string;
  size: number;
};
const BasicInfo = (props: any) => {
  const { user, setUserInfo } = props;
  const { userInfo } = user;
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const formRef = useRef<any>();
  const initialForm = {
    id: 0,
    username: "",
    gender: 0,
    role: 1,
    avatar: "",
    phone: "",
    email: "",
    remark: "",
  };
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const genderRadios = [
    { label: "basic_info.options_gender_male", value: 0 },
    { label: "basic_info.options_gender_female", value: 1 },
  ];
  const roleRadios = [
    { label: "basic_info.options_role_user", value: 1 },
    { label: "basic_info.options_role_admin", value: 2 },
    { label: "basic_info.options_role_root", value: 3 },
  ];
  const { loading: loadingGetUserDetail, runAsync: runGetUserDetail } =
    useRequest((params: object) => getUserDetail(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingUpdateUser, runAsync: runUpdateUser } = useRequest(
    (params: object) => updateUser(params),
    { manual: true, throttleWait: 1000 }
  );

  const handleBeforeUpload = (file: FileType) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error(formatMessage("basic_info.before_upload_type"));
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error(formatMessage("basic_info.before_upload_size"));
      return false;
    }
    return true;
  };
  const handleAvatarChange = (avatar: any) => {
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
  const handleSubmitForm = (params: UserDataType) => {
    params["avatar"] = avatarUrl;
    runUpdateUser(params)
      .then(() => {
        setUserInfo({
          ...userInfo,
          username: params["username"],
          avatar: params["avatar"],
        });
        message.success(formatMessage("message.edit.success"));
      })
      .catch((error) => {
        message.error(formatMessage("message.edit.error"));
        console.log(error);
      });
  };
  const handleResetForm = () => {
    const id = formRef.current.getFieldValue("id");
    setAvatarUrl("");
    formRef.current.resetFields();
    formRef.current.setFieldsValue({ id });
  };
  const handleGetUserDetail = () => {
    runGetUserDetail(userInfo.id)
      .then((response: any) => {
        const { result } = response;
        const data = result[0];

        setAvatarUrl(data.avatar);
        formRef.current.setFieldsValue(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetUserDetail();
  }, []);

  return (
    <SpinCard
      spinning={loadingGetUserDetail || loadingUpdateUser}
      title={formatMessage("basic_info.title")}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        name="basicinfo"
        ref={formRef}
        initialValues={initialForm}
        onFinish={handleSubmitForm}
      >
        <span style={{ marginLeft: "17%", color: "#999" }} className="ml-1/6">
          {formatMessage("basic_info.id_desciption")}
        </span>
        <Form.Item label="ID" name="id">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label={formatMessage("basic_info.label_username")}
          name="username"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={formatMessage("basic_info.label_gender")}
          name="gender"
        >
          <Radio.Group>
            {genderRadios.map((options) => (
              <Radio key={options.value} value={options.value}>
                {formatMessage(options.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label={formatMessage("basic_info.label_role")} name="role">
          <Radio.Group>
            {roleRadios.map((options) => (
              <Radio key={options.value} value={options.value}>
                {formatMessage(options.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={formatMessage("basic_info.label_avatar")}
          name="avatar"
          valuePropName="avatar"
        >
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
                alt={formatMessage("basic_info.avatar_alt")}
                className="w-full h-full"
              />
            ) : (
              <Uploading uploading={uploading} />
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label={formatMessage("basic_info.label_phone")}
          name="phone"
          rules={[
            {
              pattern: PhoneRegexp,
              message: formatMessage("basic_info.rules_phone"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={formatMessage("basic_info.label_email")}
          name="email"
          rules={[
            {
              pattern: EmailRegexp,
              message: formatMessage("basic_info.rules_email"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={formatMessage("basic_info.label_remark")}
          name="remark"
        >
          <Input.TextArea
            rows={4}
            placeholder={formatMessage("basic_info.placeholder_remark")}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Space size={20}>
            <Button type="primary" htmlType="submit">
              {formatMessage("basic_info.save")}
            </Button>
            <Button htmlType="button" onClick={handleResetForm}>
              {formatMessage("basic_info.reset")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </SpinCard>
  );
};

const mapStateToProps = (state: object) => state;
const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (data: object) => {
    dispatch(setUserInfo(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
