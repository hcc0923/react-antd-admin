import { SET_COLLAPSE, SET_THEME, SET_BREADCRUMB, SET_TAG } from '../constants/index';
const collapseState = localStorage.getItem('collapse') ? JSON.parse(localStorage.getItem('collapse')) : { show: true };
const themeState = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : { type: 'dark' };
const breadcrumbState = localStorage.getItem('breadcrumb') ? JSON.parse(localStorage.getItem('breadcrumb')) : { show: true };
const tagState = localStorage.getItem('tag') ? JSON.parse(localStorage.getItem('tag')) : { show: true };


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
/* 
    面包屑
    breadcrumb
*/
export const breadcrumb = (state = breadcrumbState, action) => {
    switch (action.type) {
        case SET_BREADCRUMB:
            localStorage.setItem('breadcrumb', JSON.stringify(action.data));
            return action.data;
        default: 
            return state;
    };
};
/* 
    标签
    tag
*/
export const tag = (state = tagState, action) => {
    switch (action.type) {
        case SET_TAG:
            localStorage.setItem('tag', JSON.stringify(action.data));
            return action.data;
        default: 
            return state;
    };
};