import { SET_SETTINGS } from '../constants/index';


/* 
    设置settings
    setSettings
*/
export const setSettings = (data) => ({
    type: SET_SETTINGS,
    data
});