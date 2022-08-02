import { SET_TOKEN, SET_USER_INFO } from '../constants/index';

const initState = {
    token: '',
    userInfo: {
        id: 0,
        username: '',
        role: 1,
        avatar: '',
        last_login_time: '',
        last_login_ip: ''
    }
}
const userState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : initState;
const user = (state = userState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}

export default user;