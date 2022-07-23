import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import { settings,collapse } from './setting';


const concatReducers = combineReducers({
    token,
    userInfo,
    settings,
    collapse
});

export default concatReducers;