import * as types from './mutation-types'

export default {
    [types.UPDATE_USER_ID] (state, id) {
        state.id = id
    },
    [types.UPDATE_USER] (state, {id, name, usertype}) {
        console.log(id, name, usertype);
        state.username = name;
        state.id = id;
        state.userType = usertype === '1' ? '学生' : '老师';
    },
    [types.SET_ACTIVE_TAB] (state, activeTab) {
        if (state.activeTab === activeTab) return;
        state.activeTab = activeTab;
    },
    [types.SHOW_LOGIN_SHEET] (state, flag) {
        state.showLoginSheet = flag;
    },
    [types.CHANGE_PAGE_TYPE] (state, flag) {
        state.mainPage = flag;
    }
}