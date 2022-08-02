import { 
    SET_SETTINGS, 
    SET_COLLAPSE, 
    SET_LOGO, 
    SET_TAG, 
    SET_FIXED_HEADER, 
    SET_OPEN_KEYS 
} from '../constants/index';


export const setSettings = (data) => ({
    type: SET_SETTINGS,
    data
});



export const setCollapse = (data) => ({
    type: SET_COLLAPSE,
    data
});

export const setLogo = (data) => ({
    type: SET_LOGO,
    data
});

export const setFixedHeader = (data) => ({
    type: SET_FIXED_HEADER,
    data
});

export const setTag = (data) => ({
    type: SET_TAG,
    data
});

export const setOpenKeys = (data) => ({
    type: SET_OPEN_KEYS,
    data
});