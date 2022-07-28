import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import store from '@/store/store';
import Router from '@/router/index';
import './index.less';

import http from '@/utils/request';
React.$http = http;



const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);