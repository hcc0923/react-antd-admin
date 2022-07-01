import { SET_COLLAPSE, SET_THEME, SET_PRIMARY_COLOR } from '../constants/index';
const collapseState = localStorage.getItem('collapse') ? JSON.parse(localStorage.getItem('collapse')) : { show: true };
const themeState = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : { type: 'dark' };
const primaryColorState = localStorage.getItem('primaryColor') ? JSON.parse(localStorage.getItem('primaryColor')) : '#1DA57A';


/* 
    折叠
    collapse
*/
export const collapse = (state = collapseState, action) => {
    switch (action.type) {
		case SET_COLLAPSE:
            localStorage.setItem('collapse', JSON.stringify(action.data));
			return action.data;
		default:
			return state;
	};
};
/* 
    主题
    theme
*/
export const theme = (state = themeState, action) => {
    switch (action.type) {
        case SET_THEME:
            localStorage.setItem('theme', JSON.stringify(action.data));
            return action.data;
        default:
            return state;
    };
};

export const primaryColor = (state = primaryColorState, action) => {
    switch (action.type) {
        case SET_PRIMARY_COLOR:
            localStorage.setItem('primaryColor', JSON.stringify(action.data));
            return action.data;
        default:
            return state;
    };
};