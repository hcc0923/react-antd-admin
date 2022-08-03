import { SET_SETTINGS } from '../constants/index';


const initSettings = {
	showLogo: true,
	showTag: true,
	fixedHeader: false, 
};
const settingsState = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : initSettings;
export const settings = (state = settingsState, action) => {
    switch (action.type) {
		case SET_SETTINGS:
            localStorage.setItem('settings', JSON.stringify(action.settings));
			return action.settings;
		default:
			return state;
	}
}

export default settings;