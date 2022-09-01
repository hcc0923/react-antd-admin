import { SET_TOKEN, SET_USER_INFO } from "../constants/index";

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const setUserInfo = (userInfo: object) => ({
  type: SET_USER_INFO,
  userInfo,
});
