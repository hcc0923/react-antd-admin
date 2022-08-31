import {
  SET_COLLAPSE,
  SET_INTL,
  SET_FIXED_HEADER,
  SET_SHOW_LOGO,
  SET_SHOW_TAG,
} from "../constants/index";

export const setCollapse = (collapsed) => ({
  type: SET_COLLAPSE,
  collapsed,
});

export const setIntl = (intl) => ({
  type: SET_INTL,
  intl,
});

export const setFixedHeader = (fixedHeader) => ({
  type: SET_FIXED_HEADER,
  fixedHeader,
});

export const setShowLogo = (showLogo) => ({
  type: SET_SHOW_LOGO,
  showLogo,
});

export const setShowTag = (showTag) => ({
  type: SET_SHOW_TAG,
  showTag,
});
