import { ADD_TAG, DELETE_TAG, EMPTY_TAG, DELETE_OTHER_TAG } from '../constants/index';


export const addTag = (data) => ({
    type: ADD_TAG,
    data
});


export const deleteTag = (data) => ({
    type: DELETE_TAG,
    data
});

// !TODO
export const emptyTag = (data) => ({
    type: EMPTY_TAG,
    data
});

// !TODO
export const deleteOtherTag = (data) => ({
    type: DELETE_OTHER_TAG,
    data
});