import { SET_USER_INFO } from "../constants/index";


/* 
    设置用户信息
    setUserInfo
*/
export const setUserInfo = (data) => ({
    type: SET_USER_INFO,
    data
});