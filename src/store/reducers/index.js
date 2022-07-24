import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import { settings,collapse,openKeys } from './setting';


const concatReducers = combineReducers({
    token,
    userInfo,
    settings,
    collapse,
    openKeys
});

export default concatReducers;