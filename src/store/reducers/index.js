import { combineReducers } from 'redux';
import user from './user';
import collapsed from './collapsed';
import settings from './settings';
import tag from './tag';


const concatReducers = combineReducers({
    user,
    collapsed,
    settings,
    tag,
});

export default concatReducers;