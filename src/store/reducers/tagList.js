import { ADD_TAG, REMOVE_TAG } from '../constants/index';


/* 
    标签列表
    tagList
*/
const tagList = (state = [{ path: 'home', name: '首页' }], action) => {
    switch (action.type) {
        case ADD_TAG:
            const addState = JSON.parse(JSON.stringify(state));
            const addTag = action.data;

            const isExist = addState.every(item => {
                return (item.path !== addTag.path && item.name !== addTag.name) ? true : false;
            });
            if (isExist) {
                addState.push(addTag);
            };

            return addState;
        case REMOVE_TAG:
            const removeState = JSON.parse(JSON.stringify(state));
            const removeTag = action.data;
            
            removeState.forEach((item, index, array) => {
                if (item.path === removeTag.path && item.name === removeTag.name) {
                    array.splice(index, 1);
                };
            });

            return removeState;
        default:
            return state;
    };
};
export default tagList;