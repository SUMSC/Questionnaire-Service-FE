import * as types from '../mutation-types';

export default {
    state: {
        searchText: '',
        searchResult: [{
            name: '测试活动1',
        },{
            name: '测试活动2'
        }],
        inputSearch: true,
    },
    mutations: {
        [types.SEARCH.UPDATE_SEARCH_TEXT] (state, searchText) {
            state.searchText = searchText;
        },
        [types.SEARCH.UPDATE_SEARCH_STATUS] (state, inputSearch) {
            state.inputSearch = inputSearch;
        },
        [types.SEARCH.UPDATE_SEARCH_RESULT] (state, resule) {
            state.searchResult = resule;
        }
    }
}