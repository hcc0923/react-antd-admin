import { SET_SETTINGS } from '../constants/index';


export const setSettings = (settings) => ({
    type: SET_SETTINGS,
    settings
});