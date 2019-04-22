import axios from "axios";
import {hashSeed} from "./auth";
import * as queries from "./queries";

const RESOURCE_URL = `http://localhost:8000`;

export const api = axios.create({
    baseURL: RESOURCE_URL,
    method: 'POST'
});

export const getEventById = (id, token, content) => {
    const options = {
        data: {
            query: queries.event(content),
            variables: {id}
        },
        responseType: 'json',
        headers: {
            'Authorization': token
        }
    };
    return api(options).then(res => res['data']['data']['event'][0]);
};

const SEARCH_URL = `http://192.168.2.101:9200`;

export const search_api = axios.create({
    baseURL: SEARCH_URL,
    method: 'POST'
});