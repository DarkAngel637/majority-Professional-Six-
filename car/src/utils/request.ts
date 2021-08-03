import axios from 'axios';
import { IBrandItem } from './types';

const instance = axios.create({
    baseURL: 'http://baojia.chelun.com',
    timeout: 1000,
    headers: {}
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200){
        if (response.data.code === 1){
            return response.data.data;
        }else{
            console.error(response.data.msg);
        }
    }else{
        console.error(response.statusText);
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;