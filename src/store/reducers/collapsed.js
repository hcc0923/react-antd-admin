import { SET_COLLAPSE } from '../constants/index';


const initState = false;
const collapsedState = localStorage.getItem('collapsed') ? localStorage.getItem('collapsed') : initState;
export const collapsed = (state = collapsedState, action) => {
    switch (action.type) {
		case SET_COLLAPSE:
            localStorage.setItem('collapsed', action.collapsed);
			return action.collapsed;
		default:
			return state;
	}
}

export default collapsed;