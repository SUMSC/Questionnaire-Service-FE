import * as types from '../mutation-types';
import {log} from "../../utils/lib";
import {search_api} from "../../utils/resource";

export default {
    namespaced: true,
    state: {
        searchText: '',
        searchResult: [],
        inputSearch: true,
        cursor: 0
    },
    mutations: {
        [types.SEARCH.UPDATE_SEARCH_TEXT] (state, searchText) {
            state.searchText = searchText;
        },
        [types.SEARCH.UPDATE_SEARCH_STATUS] (state, inputSearch) {
            state.inputSearch = inputSearch;
        },
        [types.SEARCH.UPDATE_SEARCH_RESULT] (state, {result, refresh}) {
            if (refresh) {
                state.searchResult = result;
            } else {
                state.searchResult.concat(result);
            }
        },
        [types.SEARCH.UPDATE_SEARCH_CURSOR] (state, now) {
            state.cursor = now;
        }
    },
    actions: {
        async doSearch(context, {title}) {
            log(`Search ${title}`);
            const options = {
                data: {
                    "query": {
                        "multi_match": {
                            "query": context.state.searchText,
                            "fields": ['name']
                        }
                    },
                    "sort": [
                        {"create_time": {"order": "desc"}}
                    ],
                    "from": context.state.cursor,
                    "size": 10
                },
                responseType: 'json',
                url: `/${title}/_search`
            };
            search_api(options).then(res => {
                log(res);
                context.commit({
                    type: types.SEARCH.UPDATE_SEARCH_RESULT,
                    result: res['data']['hits']['hits'],
                    refresh: true
                })
            })
        }
    }
}