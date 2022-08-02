import { combineReducers } from 'redux';
import { settings,logo,fixedHeader, showTag, collapse,openKeys } from './setting';
import tag from './tag';
import user from './user';


const concatReducers = combineReducers({
    user,
    settings,
    fixedHeader,
    logo,
    showTag,
    collapse,
    openKeys,
    tag,
});

export default concatReducers;