import request from "@/utils/request";

export const getUser = (data) => {
  return request({
    url: "/user/getUser",
    method: "post",
    data,
  });
};

export const addUser = (data) => {
  return request({
    url: "/user/addUser",
    method: "post",
    data,
  });
};

export const editUser = (data) => {
  return request({
    url: "/user/editUser",
    method: "put",
    data,
  });
};

export const deleteUser = (data) => {
  return request({
    url: "/user/deleteUser",
    method: "delete",
    data,
  });
};

export const multipleDelete = (data) => {
  return request({
    url: "/user/multipleDelete",
    method: "delete",
    data,
  });
};

export const getUserDetail = (data) => {
  return request({
    url: `/user/getUserDetail/${data}`,
    method: "get",
  });
};

export const updateUser = (data) => {
  return request({
    url: "/user/updateUser",
    method: "put",
    data,
  });
};

export const uploadAvatar = (data) => {
  return request({
    url: "/user/uploadAvatar",
    method: "put",
    data,
  });
};

export const getRole = (data) => {
  return request({
    url: "/user/getRole",
    method: "post",
    data,
  });
};

export const editRole = (data) => {
  return request({
    url: "/user/editRole",
    method: "put",
    data,
  });
};

export const checkPassword = (data) => {
  return request({
    url: "/user/checkPassword",
    method: "post",
    data,
  });
};

export const updatePassword = (data) => {
  return request({
    url: "/user/updatePassword",
    method: "put",
    data,
  });
};
