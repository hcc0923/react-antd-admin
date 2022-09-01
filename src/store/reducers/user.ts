import { SET_TOKEN, SET_USER_INFO } from "../constants/index";

const initState = {
  token: "",
  userInfo: {
    id: 0,
    username: "",
    role: 1,
    avatar: "",
    last_login_time: "",
    last_login_ip: "",
  },
};
const userData: any = localStorage.getItem("user");
const userState = userData ? JSON.parse(userData) : initState;
const user = (state = userState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      const userToken = {
        ...state,
        toekn: action.toekn,
      };
      localStorage.setItem("user", JSON.stringify(userToken));
      return userToken;
    case SET_USER_INFO:
      const userUserInfo = {
        ...state,
        userInfo: action.userInfo,
      };
      localStorage.setItem("user", JSON.stringify(userUserInfo));
      return userUserInfo;
    default:
      return state;
  }
};

export default user;
