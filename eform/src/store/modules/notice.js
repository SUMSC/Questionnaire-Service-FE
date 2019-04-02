import * as types from '../mutation-types';

export default {
    state: {
        noticeText: '这是一条公告。',
        isNotice: true
    },
    mutations: {
        [types.NOTICE.UPDATE_NOTICE] (state, noticeText) {
            state.isNotice = true;
            state.noticeText = noticeText;
        }
    }
}