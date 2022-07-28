import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import { settings,logo,fixedHeader, showTag, collapse,openKeys } from './setting';
import tag from './tag';


const concatReducers = combineReducers({
    token,
    userInfo,
    settings,
    fixedHeader,
    logo,
    showTag,
    collapse,
    openKeys,
    tag
});

export default concatReducers;