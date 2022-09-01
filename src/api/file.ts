import request from "@/utils/request";

export const uploadAvatar = (data: object) => {
  return request({
    url: "/file/uploadAvatar",
    method: "post",
    data,
  });
};

export const uploadMultipleFile = (data: object) => {
  return request({
    url: "/file/uploadMultipleFile",
    method: "post",
    data,
  });
};

export const deleteSingleFile = (data: object) => {
  return request({
    url: "/file/deleteSingleFile",
    method: "delete",
    data,
  });
};

export const deleteAllFile = (data: object) => {
  return request({
    url: "/file/deleteAllFile",
    method: "delete",
    data,
  });
};

export const getAllFileList = () => {
  return request({
    url: "/file/getAllFileList",
    method: "get",
  });
};

export const getMyUploadList = () => {
  return request({
    url: "/file/getMyUploadList",
    method: "get",
  });
};
