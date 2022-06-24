import { ADD_BREADCRUMB } from '../constants/index';


/* 
    添加面包屑
    addBreadCrumb
*/
export const addBreadCrumb = (data) => {
    return {
        type: ADD_BREADCRUMB,
        data
    };
};