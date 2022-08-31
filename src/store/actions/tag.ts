import {
  ADD_TAG,
  CLOSE_TAG,
  CLOSE_OTHER_TAG,
  CLOSE_ALL_TAG,
} from "../constants/index";

export const addTag = (data) => ({
  type: ADD_TAG,
  data,
});

export const closeTag = (data) => ({
  type: CLOSE_TAG,
  data,
});

export const closeOtherTag = (data) => ({
  type: CLOSE_OTHER_TAG,
  data,
});

export const closeAllTag = (data) => ({
  type: CLOSE_ALL_TAG,
  data,
});
