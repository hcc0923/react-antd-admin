export const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const PhoneRegexp =
  /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

export const formatRole = (role) => {
  switch (role) {
    case 1:
      return "user";
    case 2:
      return "admin";
    case 3:
      return "root";
    default:
      break;
  }
};

export const formatGMTTime = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let result = year + "-";
  if (month < 10) {
    result += "0" + month + "-";
  } else {
    result += month + "-";
  }
  if (day < 10) {
    result += "0" + day;
  } else {
    result += day;
  }
  if (hours < 10) {
    result += " 0" + hours + ":";
  } else {
    result += " " + hours + ":";
  }
  if (minutes < 10) {
    result += "0" + minutes + ":";
  } else {
    result += minutes + ":";
  }
  if (seconds < 10) {
    result += "0" + seconds;
  } else {
    result += seconds;
  }
  return result;
};