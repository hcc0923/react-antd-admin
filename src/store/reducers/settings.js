import {
  SET_COLLAPSE,
  SET_FIXED_HEADER,
  SET_SHOW_LOGO,
  SET_SHOW_TAG,
} from "../constants/index";

const initSettings = {
  collapsed: false,
  fixedHeader: false,
  showLogo: true,
  showTag: true,
};
const settingsState = localStorage.getItem("settings")
  ? JSON.parse(localStorage.getItem("settings"))
  : initSettings;
export const settings = (state = settingsState, action) => {
  switch (action.type) {
    case SET_COLLAPSE:
      const settingsCollapsed = {
        ...state,
        collapsed: action.collapsed,
      };
      localStorage.setItem("settings", JSON.stringify(settingsCollapsed));
      return settingsCollapsed;
    case SET_FIXED_HEADER:
      const settingsFixedHeader = {
        ...state,
        fixedHeader: action.fixedHeader,
      };
      localStorage.setItem("settings", JSON.stringify(settingsFixedHeader));
      return settingsFixedHeader;
    case SET_SHOW_LOGO:
      const settingsShowLogo = {
        ...state,
        showLogo: action.showLogo,
      };
      localStorage.setItem("settings", JSON.stringify(settingsShowLogo));
      return settingsShowLogo;
    case SET_SHOW_TAG:
      const settingsShowTag = {
        ...state,
        showTag: action.showTag,
      };
      localStorage.setItem("settings", JSON.stringify(settingsShowTag));
      return settingsShowTag;
    default:
      return state;
  }
};

export default settings;
