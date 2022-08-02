export const formatAmount = (val, n=0) => {
  if (val) {
      const num = parseInt(val, 10);
      return (num.toFixed(n).toString()).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  }
  return '0.00';
}


export const formatGMTTime = time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let result = year + '-';
  if (month < 10) {
      result += '0' + month + '-';
  } else {
      result += month + '-';
  }
  if (day < 10){
      result += '0' + day;
  } else {
      result += day;
  }
  if (hours < 10) {
      result += ' 0' + hours + ':';
  } else {
      result += ' ' + hours + ':';
  }
  if (minutes < 10) {
      result += '0' + minutes + ':';
  } else {
      result += minutes + ':';
  }
  if (seconds < 10) {
      result += '0' + seconds;
  } else {
      result += seconds;
  }
  return result;
}


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
}


export const debounce = (fn, delay) => {
  return function () {
      fn.id && clearTimeout(fn.id);
      fn.id = setTimeout(() => {
          fn.call(this, arguments);
      }, delay);
  }
}


export const throttle = (fn, delay) => {
  let open = false;
  return function () {
      if (!open) {
          open = true;
          setTimeout(() => {
              fn.call(this, arguments);
              open = false;
          }, delay);
      }
  }
}