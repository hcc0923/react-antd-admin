import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spin, Form, Input, Button, message } from "antd";
import CryptoJS from "crypto-js";
import { useRequest } from "ahooks";
import { findEmail, sendEmail, resetPassword } from "@/api/login";
import { EmailRegexp } from "@/utils";
import { EMAIL_KEY } from "@/utils/config";

const Forget = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("validate");
  const [validateForm, setValidateForm] = useState<any>({
    email: "",
    code: "",
  });
  const [resetForm, setResetForm] = useState<any>({
    password: "",
    repeatPassword: "",
  });
  const [codeText, setCodeText] = useState("获取验证码");
  const [disabled, setDisabled] = useState(false);
  const [authCode, setAuthCode] = useState(0);
  const { loading: loadingFindEmail, runAsync: runFindEmail } = useRequest(
    (params: object) => findEmail(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingSendEmail, runAsync: runSendEmail } = useRequest(
    (params: object) => sendEmail(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingResetPassword, runAsync: runResetPassword } =
    useRequest((params: object) => resetPassword(params), {
      manual: true,
      throttleWait: 1000,
    });

  const handleInputChange = (
    event: any,
    formType: string,
    labelName: string
  ) => {
    if (formType === "validate") {
      validateForm[labelName] = event.target.value;
      setValidateForm(validateForm);
    } else {
      resetForm[labelName] = event.target.value;
      setResetForm(resetForm);
    }
  };
  const handleValidateEmail = (event: any) => {
    const params = { email: event.target.value };
    runFindEmail(params)
      .then((response: any) => {
        const { result } = response;
        if (result.length === 0) {
          return message.error("邮箱还未注册，请先注册");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAuthEmailCode = () => {
    if (!validateForm.email || !EmailRegexp.test(validateForm.email)) {
      return message.error("请输入正确的邮箱");
    }
    const params = { email: validateForm.email };

    runSendEmail(params)
      .then((response: any) => {
        const authCode = CryptoJS.AES.decrypt(
          response.emailAuthCode,
          EMAIL_KEY
        ).toString(CryptoJS.enc.Utf8);
        setAuthCode(Number(authCode));

        let second = 59;
        let timer: any = null;
        message.success("验证码已发送到邮箱，请注意查收");

        setDisabled(true);
        setCodeText(`${second}秒后重新获取`);
        timer = setInterval(() => {
          second -= 1;
          setCodeText(`${second}秒后重新获取`);
          if (second === 0) {
            clearInterval(timer);
            setDisabled(false);
            setCodeText("获取验证码");
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFindPassword = () => {
    if (validateForm.code !== authCode.toString()) {
      return message.error("验证码不正确");
    }
    localStorage.setItem("validateEmail", validateForm.email);
    setFormType("reset");
    setValidateForm({ email: "", code: "" });
  };
  const handleResetPassword = () => {
    const cryptoPassword = CryptoJS.MD5(resetForm.password).toString();
    const params = {
      email: localStorage.getItem("validateEmail"),
      password: cryptoPassword,
    };

    runResetPassword(params)
      .then(() => {
        message.success("密码重置成功，请重新登录账号");
        localStorage.removeItem("validateEmail");
        navigate("/login");
      })
      .catch((error) => {
        message.error("密码重置失败");
        console.log(error);
      });
  };

  return (
    <Spin
      spinning={loadingFindEmail || loadingSendEmail || loadingResetPassword}
    >
      <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
        <div className="flex w-1/5 h-1/2 bg-slate-50 shadow-2xl overflow-hidden rounded-xl">
          <div className={`w-full ${formType === "reset" ? "hidden" : ""}`}>
            <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">
              忘记密码
            </h1>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              name="basic"
              className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
              initialValues={validateForm}
              onFinish={handleFindPassword}
            >
              <Form.Item
                label="邮箱"
                name="email"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "邮箱不能为空!",
                  },
                  {
                    pattern: EmailRegexp,
                    message: "邮箱格式不正确!",
                  },
                ]}
                onChange={(event: any) =>
                  handleInputChange(event, "validate", "email")
                }
                onBlur={handleValidateEmail}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="验证码"
                name="code"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "验证码不能为空!",
                  },
                ]}
                onChange={(event: any) =>
                  handleInputChange(event, "validate", "code")
                }
              >
                <div className="flex">
                  <Input className="mr-0" />
                  <Button
                    type="primary"
                    disabled={disabled}
                    className={`w-25 text-xs px-1 py-0 ml-3 ${
                      disabled ? "disabled:opacity-50 disabled" : ""
                    }`}
                    onClick={handleAuthEmailCode}
                  >
                    {codeText}
                  </Button>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  找回密码
                </Button>
              </Form.Item>
              <Link to="/login" className="mx-0 my-1 text-gray-300">
                已有账号，去登录
              </Link>
            </Form>
          </div>
          <div className={`w-full ${formType === "validate" ? "hidden" : ""}`}>
            <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">
              重置密码
            </h1>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              name="basic"
              className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
              initialValues={resetForm}
              onFinish={handleResetPassword}
            >
              <Form.Item
                label="密码"
                name="password"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "密码不能为空!",
                  },
                  {
                    min: 6,
                    message: "密码长度不能少于六位!",
                  },
                ]}
                onChange={(event: any) =>
                  handleInputChange(event, "reset", "password")
                }
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="密码"
                name="repeatPassword"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "密码不能为空!",
                  },
                  {
                    validator: (_, value) =>
                      value === resetForm.password
                        ? Promise.resolve()
                        : Promise.reject("两次输入的密码不一致!"),
                  },
                ]}
                onChange={(event: any) =>
                  handleInputChange(event, "reset", "repeatPassword")
                }
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  重置新密码
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Forget;
