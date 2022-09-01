import request from "@/utils/request";

export const addTask = (data: object) => {
  return request({
    url: "/task/addTask",
    method: "post",
    data,
  });
};

export const deleteTask = (data: object) => {
  return request({
    url: "/task/deleteTask",
    method: "delete",
    data,
  });
};

export const editTask = (data: object) => {
  return request({
    url: "/task/editTask",
    method: "put",
    data,
  });
};

export const getTask = (data: object) => {
  return request({
    url: "/task/getTask",
    method: "post",
    data,
  });
};
