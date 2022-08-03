import { combineReducers } from 'redux';
import user from './user';
import settings from './settings';
import tag from './tag';


const concatReducers = combineReducers({
    user,
    settings,
    tag,
});

export default concatReducers;