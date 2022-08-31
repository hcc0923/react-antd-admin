import request from "@/utils/request";

export const addTask = (data) => {
  return request({
    url: "/task/addTask",
    method: "post",
    data,
  });
};

export const deleteTask = (data) => {
  return request({
    url: "/task/deleteTask",
    method: "delete",
    data,
  });
};

export const editTask = (data) => {
  return request({
    url: "/task/editTask",
    method: "put",
    data,
  });
};

export const getTask = (data) => {
  return request({
    url: "/task/getTask",
    method: "post",
    data,
  });
};
