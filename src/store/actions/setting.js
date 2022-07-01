import { SET_COLLAPSE, SET_THEME, SET_PRIMARY_COLOR } from '../constants/index';
// import $http from '@/utils/request';


/* 
    设置折叠
    setCollapse
*/
export const setCollapse = (data) => {
    return {
        type: SET_COLLAPSE,
        data
    };
};
/* 
    设置主题
    setTheme
*/
export const setTheme = (data) => {
    return {
        type: SET_THEME,
        data
    };
};

export const setPrimaryColor = (data) => {
    return {
        type: SET_PRIMARY_COLOR,
        data
    };
};


/* 
    设置消息
    setMessage
*/
// export const setMessage = (params) => {
//     // 原则上action返回的是一个对象，当我们使用redux的中间件后，action就可以返回一个函数，然后在函数里面进行异步操作
//     // 当我们创建一个内容是函数的action时，返回的函数就会自动会接收到store.dispatch这个方法
//     // 所以只要返回的函数里调用dispatch，然后派发action给store，store判断接收的action是一个对象，就会发送给reducer处理
//     // store接收一个函数的话会执行这个函数
//     return (dispatch) => {
//         $http.get('/message/getMessage', {params})
//             .then(response => {
//                 const { result } = response;
//                 const action = { 
//                     type: SET_MESSAGE,
//                     data: { count: result.length }
//                 };
//                 dispatch(action);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };
// };