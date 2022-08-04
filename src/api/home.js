import request from "@/utils/request";

export const getTopCard = () => {
  return request({
    url: "/home/getTopCard",
    method: "get",
  });
};

export const getCenterContent = () => {
  return request({
    url: "/home/getCenterContent",
    method: "get",
  });
};

export const getFooterTable = () => {
  return request({
    url: "/home/getFooterTable",
    method: "get",
  });
};
