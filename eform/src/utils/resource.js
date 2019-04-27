import axios from "axios";
import {hashSeed} from "./auth";
import * as queries from "./queries";
import store from "../store";
import {log, warn} from "./lib";

const RESOURCE_URL = `http://localhost:8000/api/`;

const api = axios.create({
    baseURL: RESOURCE_URL,
    responseType: 'json',
    timeout: 5000
});

api.interceptors.request.use(config => {
    if (store.state.authToken) {
        config.headers['Authorization'] = store.state.authToken;
    }
    return config;
}, err => {
    log(err);
    Promise.reject(err);
});

// api.interceptors.response.use(response => response, error => {
//     warn('err' + error);
//     return Promise.reject(error);
// });

export const update_api = async (model, data) => {
    return api({
        url: model,
        method: 'PUT',
        data
    }).then(res => res['data']);
};

export const delete_api = async (model, data) => {
    return api({
        url: model,
        method: 'DELETE',
        data
    }).then(res => res['data']);
};

export const insert_api = async (model, data) => {
    return api({
        url: model,
        method: 'POST',
        data
    }).then(res => res['data']);
};

export const select_api = async (model, data) => {
    return api({
        url: model,
        method: 'GET',
        params: data
    }).then(res => res['data']);
};

const SEARCH_URL = `http://192.168.2.101:9200`;

export const search_api = axios.create({
    baseURL: SEARCH_URL,
    method: 'POST'
});