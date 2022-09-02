import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Form, Input, Button, Space, Spin, message } from "antd";
import CryptoJS from "crypto-js";
import { useRequest } from "ahooks";
import SpinCard from "@/components/SpinCard";
import { checkPassword, updatePassword } from "@/api/user";

type CheckPasswordType = {
  password: string;
};
type CheckNewPasswordType = {
  newPassword: string;
};
type DataPasswordType = {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
};
const ModifyPassword = () => {
  const navigate = useNavigate();
  const [isFirst, setIsFirst] = useState(true);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const { loading: loadingCheckPassword, runAsync: runCheckPassword } =
    useRequest((params: CheckPasswordType) => checkPassword(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingUpdatePassword, runAsync: runUpdatePassword } =
    useRequest((params: CheckNewPasswordType) => updatePassword(params), {
      manual: true,
      throttleWait: 1000,
    });

  const handleVerifyPassword = (event: any) => {
    setIsFirst(false);
    const value = event.target.value;
    if (value === "") {
      return message.error(formatMessage("modify_password.verify_password"));
    }

    const params = { password: CryptoJS.MD5(value).toString() };
    runCheckPassword(params)
      .then(() => {
        setVerifyPassword(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitForm = (values: DataPasswordType) => {
    const params = { newPassword: CryptoJS.MD5(values.newPassword).toString() };

    runUpdatePassword(params)
      .then(() => {
        message.success(formatMessage("modify_password.success_update"));
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SpinCard
      spinning={loadingCheckPassword || loadingUpdatePassword}
      title={formatMessage("modify_password.title")}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        name="update"
        initialValues={{ password: "", repeatPassword: "" }}
        onFinish={handleSubmitForm}
      >
        <Form.Item
          label={formatMessage("modify_password.label_password")}
          name="password"
          hasFeedback
          validateStatus={isFirst ? "" : verifyPassword ? "success" : "error"}
          rules={[
            {
              min: 6,
              max: 12,
              message: formatMessage("modify_password.rules_length_password"),
            },
            {
              required: true,
              message: formatMessage("modify_password.rules_password"),
            },
          ]}
        >
          <Input.Password onBlur={handleVerifyPassword} />
        </Form.Item>
        <span style={{ marginLeft: "17%", color: "#999" }}>
          {formatMessage("modify_password.password_desciption")}
        </span>
        <Form.Item
          label={formatMessage("modify_password.label_new_password")}
          name="newPassword"
          hasFeedback
          rules={[
            {
              min: 6,
              max: 12,
              message: formatMessage(
                "modify_password.rules_length_new_password"
              ),
            },
            {
              required: true,
              message: formatMessage("modify_password.rules_new_password"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={formatMessage("modify_password.label_repeat_new_password")}
          name="repeatNewPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              min: 6,
              max: 12,
              message: formatMessage(
                "modify_password.rules_length_repeat_new_password"
              ),
            },
            {
              required: true,
              message: formatMessage(
                "modify_password.rules_repeat_new_password"
              ),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  formatMessage(
                    "modify_password.rules_validator_repeat_new_password"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Space size={20}>
            <Button type="primary" htmlType="submit">
              {formatMessage("modify_password.save")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </SpinCard>
  );
};

export default ModifyPassword;
