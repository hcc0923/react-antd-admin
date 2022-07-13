import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import { settings } from './setting';


const concatReducers = combineReducers({
    token,
    userInfo,
    settings
});

export default concatReducers;