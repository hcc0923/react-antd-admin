import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

// 引入store管理员
import reducers from './reducers/index';

//  这句话的意思就是看window里有没有这个方法，有则执行这个方法
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;

// 创建数据仓库
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;