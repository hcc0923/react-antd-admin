/* 
    debounce
    防抖函数
*/
export const debounce = (fn, delay) => {
    return function () {
        fn.id && clearTimeout(fn.id);
        fn.id = setTimeout(() => {
            fn.call(this, arguments);
        }, delay);
    }
}
/* 
    throttle
    节流函数
*/
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