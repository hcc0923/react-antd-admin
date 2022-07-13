import { SET_USER_INFO } from '../constants/index';
const userInfoState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : { id:0, role: 1, username: '', avatar: ''};


const userInfo = (state = userInfoState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return action.data; 
        default:
            return state;
    }
}

export default userInfo;