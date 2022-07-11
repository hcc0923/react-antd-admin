import React from 'react';
import { Spin } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


NProgress.configure({ showSpinner: false });
function Loading(props) {
    NProgress.start();
    if (!props.error) {
        NProgress.done();
    }
    return (
        <div className="relative h-screen">
            <Spin className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl" tip="loading..." />
        </div>
    );
}

export default Loading;