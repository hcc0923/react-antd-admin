import { combineReducers } from 'redux';
import { collapse, theme, primaryColor  } from './setting';
import userInfo from './userInfo';
import token from './token';


const concatReducers = combineReducers({
    collapse, 
    theme,
    primaryColor,
    userInfo,
    token
});
export default concatReducers;