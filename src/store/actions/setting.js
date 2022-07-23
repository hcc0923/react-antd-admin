import { SET_SETTINGS, SET_COLLAPSE } from '../constants/index';


/* 
    设置settings
    setSettings
*/
export const setSettings = (data) => ({
    type: SET_SETTINGS,
    data
});



export const setCollapse = (data) => ({
    type: SET_COLLAPSE,
    data
});