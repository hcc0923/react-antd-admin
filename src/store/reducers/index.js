import { combineReducers } from 'redux';
import { collapse, theme  } from './setting';
import userInfo from './userInfo';
import token from './token';


const concatReducers = combineReducers({
    collapse, 
    theme,
    userInfo,
    token
});
export default concatReducers;