import axios from 'axios';
import { message } from 'antd';

const MESSAGE_KEY = 'message_key';
let authenticatedRequest,
    authenticatedFormRequest;

authenticatedRequest = axios.create({});
authenticatedRequest.interceptors.request.use(function (config) {
    message.open({
        key: MESSAGE_KEY,
        type: 'loading',
        duration: 0,
        content: 'Loading...'
    })
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

authenticatedFormRequest = axios.create();
authenticatedFormRequest.interceptors.request.use(function (config) {
    let formData = new FormData();
    for (let key in config.data) {
        formData.append(key, config.data[key]);
    }
    config.data = formData;
    message.open({
        key: MESSAGE_KEY,
        type: 'loading',
        duration: 0,
        content: 'Loading...'
    })
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data',
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

authenticatedRequest.interceptors.response.use(function (response) {
    message.destroy(MESSAGE_KEY);
    return response;
}, function (err) {
    message.destroy(MESSAGE_KEY);
    message.warning(err.response.data);
    return Promise.reject(err);
});


export {
    authenticatedRequest,
    authenticatedFormRequest
}