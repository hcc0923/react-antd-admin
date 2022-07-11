import Axios from "axios";
import { message } from "antd";
import { SERVER_ADDRESS } from '@/utils/config';

// api address
const HTTP_API = SERVER_ADDRESS;
const WHITE_API = ['/login', '/register'];

// create axios instance
const http = Axios.create({
    baseURL: HTTP_API,
    timeout: 1000 * 5,
    withCredentials: true
});

// intercept request
http.interceptors.request.use(
    config => {
        const { url } = config;
        // is white list
        if (!WHITE_API.includes(url)) {
            // no white list auth
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
        }
        return config;
    },  
    error => {
        return Promise.reject(error);
    }
);

// intercept response
http.interceptors.response.use(
    response => {
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
        return Promise.reject(error);
    }
);

export default http;