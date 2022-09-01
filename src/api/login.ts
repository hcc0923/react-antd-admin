import request from "@/utils/request";

export const userLogin = (data: object) => {
  return request({
    url: "/login/userLogin",
    method: "post",
    data,
  });
};

export const userRegister = (data: object) => {
  return request({
    url: "/login/userRegister",
    method: "post",
    data,
  });
};

export const findEmail = (data: object) => {
  return request({
    url: "/login/findEmail",
    method: "post",
    data,
  });
};

export const sendEmail = (data: object) => {
  return request({
    url: "/login/sendEmail",
    method: "post",
    data,
  });
};

export const resetPassword = (data: object) => {
  return request({
    url: "/login/resetPassword",
    method: "put",
    data,
  });
};
