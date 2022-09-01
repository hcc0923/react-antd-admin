import {
  ADD_TAG,
  CLOSE_TAG,
  CLOSE_OTHER_TAG,
  CLOSE_ALL_TAG,
} from "../constants/index";
const tagState = [{ label: "menulist.home", key: "/home" }];

const tag = (state = tagState, action: any) => {
  switch (action.type) {
    case ADD_TAG:
      const exist = tagState.find((item) => item.key === action.data.key);
      if (exist) {
        return tagState;
      }
      tagState.push(action.data);
      return tagState;
    case CLOSE_TAG:
      const targetIndex = tagState.findIndex(
        (item) => item.key === action.data.key
      );
      tagState.splice(targetIndex, 1);
      return tagState;
    case CLOSE_OTHER_TAG:
      const filterState = tagState.filter(
        (item) => item.key === action.data.key || item.key === "/home"
      );
      return filterState;
    case CLOSE_ALL_TAG:
      const emptyState = tagState.filter((item) => item.key === "/home");
      return emptyState;
    default:
      return state;
  }
};

export default tag;
