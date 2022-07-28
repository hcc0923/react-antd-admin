import { SET_SETTINGS, SET_COLLAPSE, SET_LOGO, SET_TAG, SET_FIXED_HEADER, SET_OPEN_KEYS } from '../constants/index';
const defaultSettings = {
    contentWidth: 'Fluid', 
    fixSiderbar: false, 
    fixedHeader: false, 
    headerHeight: 48,
    layout: 'side',
    navTheme: 'dark',
    primaryColor: '#1890ff',
    splitMenus: false,
    test: 100
};
const settingsState = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings;


/* 
    设置
    settings
*/
export const settings = (state = settingsState, action) => {
    switch (action.type) {
		case SET_SETTINGS:
            localStorage.setItem('settings', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	}
}

export const collapse = (state = { collapsed: false }, action) => {
    switch (action.type) {
		case SET_COLLAPSE:
            // localStorage.setItem('settings', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	}
}

export const fixedHeader = (state = false, action) => {
    switch (action.type) {
		case SET_FIXED_HEADER:
            // localStorage.setItem('settings', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	}
}

export const logo = (state = true, action) => {
    switch (action.type) {
		case SET_LOGO:
            // localStorage.setItem('settings', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	}
}

export const showTag = (state = true, action) => {
    switch (action.type) {
		case SET_TAG:
            // localStorage.setItem('settings', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	}
}

export const openKeys = (state = [], action) => {
    switch (action.type) {
		case SET_OPEN_KEYS:
            // localStorage.setItem('settings', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	}
}