import { combineReducers } from 'redux';
import { collapse, theme, breadcrumb, tag  } from './setting';
import breadCrumb from './breadCrumb';
import tagList from './tagList';
import userInfo from './userInfo';
import token from './token';


const concatReducers = combineReducers({
    collapse, 
    theme,
    breadcrumb,
    breadCrumb,
    tag,
    tagList,
    userInfo,
    token
});
export default concatReducers;