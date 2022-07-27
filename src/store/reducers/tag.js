import { ADD_TAG, DELETE_TAG, EMPTY_TAG, DELETE_OTHER_TAG } from '../constants/index';
const tagState = [{ label: '首页', key: '/home' }];


const tag = (state = tagState, action) => {
    switch (action.type) {
        case ADD_TAG:
            const exist = tagState.find(item => item.key === action.data.key);
            if (exist) {
                return tagState;
            }
            tagState.push(action.data);
            return tagState; 
        case DELETE_TAG:
            const targetIndex = tagState.findIndex(item => item.key === action.data.key);
            tagState.splice(targetIndex, 1);
            return tagState;
        case EMPTY_TAG:
            tagState.splice(1);
            return tagState; 
        case DELETE_OTHER_TAG:
            return action.data; 
        default:
            return state;
    }
}


export default tag;