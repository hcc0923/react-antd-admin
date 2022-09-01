import {
  ADD_TAG,
  CLOSE_TAG,
  CLOSE_OTHER_TAG,
  CLOSE_ALL_TAG,
} from "../constants/index";

export const addTag = (data: object) => ({
  type: ADD_TAG,
  data,
});

export const closeTag = (data: object) => ({
  type: CLOSE_TAG,
  data,
});

export const closeOtherTag = (data: object) => ({
  type: CLOSE_OTHER_TAG,
  data,
});

export const closeAllTag = () => ({
  type: CLOSE_ALL_TAG,
});
