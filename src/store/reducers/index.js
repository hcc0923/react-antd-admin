import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import { settings,collapse,openKeys } from './setting';
import tag from './tag';


const concatReducers = combineReducers({
    token,
    userInfo,
    settings,
    collapse,
    openKeys,
    tag
});

export default concatReducers;