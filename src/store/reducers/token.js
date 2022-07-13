import { SET_TOKEN } from '../constants/index';
const tokenState = localStorage.getItem('token') ? localStorage.getItem('token') : null;


const token = (state = tokenState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return action.data; 
        default:
            return state;
    }
}

export default token;