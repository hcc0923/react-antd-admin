import { SET_TOKEN } from '../constants/index';


/* 
    设置token
    setToken
*/
export const setToken = (data) => ({
    type: SET_TOKEN,
    data
});