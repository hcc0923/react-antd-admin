import { ADD_TAG, DELETE_TAG, EMPTY_TAG, DELETE_OTHER_TAG } from '../constants/index';
const tagState = [{ label: '首页', key: '/home' }];


const tag = (state = tagState, action) => {
    switch (action.type) {
        case ADD_TAG:
            if (tagState.includes(action.data)) {
                return tagState;
            }
            return [...tagState, action.data]; 
        case DELETE_TAG:
            return tagState.filter(item => {
                return item.key !== action.data.key;
            });
        case EMPTY_TAG:
            return action.data; 
        case DELETE_OTHER_TAG:
            return action.data; 
        default:
            return state;
    }
}


export default tag;