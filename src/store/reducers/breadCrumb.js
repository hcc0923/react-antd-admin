import { ADD_BREADCRUMB } from '../constants/index';


/* 
    面包屑
    breadCrumb
*/
const breadCrumb = (state = [{ key: 'dashboard', value: '首页' }], action) => {
    switch (action.type) {
        case ADD_BREADCRUMB:
            return action.data;
        default:
            return state;
    };
};
export default breadCrumb;