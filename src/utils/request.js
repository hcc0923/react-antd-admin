import Axios from "axios";
import { message } from "antd";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SERVER_ADDRESS } from '@/utils/config';

// api address
const HTTP_API = SERVER_ADDRESS;
const WHITE_API = ['/login', '/register'];

// create axios instance
const request = Axios.create({
    baseURL: HTTP_API,
    timeout: 1000 * 5,
    withCredentials: true
});

// intercept request
request.interceptors.request.use(
    config => {
        NProgress.start();
        const { url } = config;
        // is white list
        if (!WHITE_API.includes(url)) {
            // no white list auth
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.token) {
                config.headers.authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },  
    error => {
        return Promise.reject(error);
    }
);

// intercept response
request.interceptors.response.use(
    response => {
        NProgress.done();
        const { status, data } = response;
        if (status === 200) {
            if (!data.code && data.message) {
                message.error(data.message || 'Error');
                return Promise.reject(response);
            }
            return data;
        } else {
            message.error(data.message || 'Error');
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default request;