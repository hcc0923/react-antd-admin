import { SET_COLLAPSE, SET_FIXED_HEADER, SET_SHOW_LOGO, SET_SHOW_TAG } from '../constants/index';


const initSettings = {
	collapsed: false,
	fixedHeader: false,
	showLogo: true,
	showTag: true,
};
const settingsState = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : initSettings;
export const settings = (state = settingsState, action) => {
    switch (action.type) {
		case SET_COLLAPSE:
			const collapsedSettings = {
				...state,
				collapsed: action.collapsed
			}
            localStorage.setItem('settings', JSON.stringify(collapsedSettings));
			return collapsedSettings;
		case SET_FIXED_HEADER:
			const fixedHeaderSettings = {
				...state,
				fixedHeader: action.fixedHeader
			}
            localStorage.setItem('settings', JSON.stringify(fixedHeaderSettings));
			return fixedHeaderSettings;
		case SET_SHOW_LOGO:
			const showLogoSettings = {
				...state,
				showLogo: action.showLogo
			}
            localStorage.setItem('settings', JSON.stringify(showLogoSettings));
			return showLogoSettings;
		case SET_SHOW_TAG:
			const showTagSettings = {
				...state,
				showTag: action.showTag
			}
            localStorage.setItem('settings', JSON.stringify(showTagSettings));
			return showTagSettings;
		default:
			return state;
	}
}

export default settings;