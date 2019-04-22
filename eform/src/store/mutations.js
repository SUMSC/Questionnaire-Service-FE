import * as types from './mutation-types'

export default {
    [types.UPDATE_USER_ID] (state, id) {
        state.id = id
    },
    [types.UPDATE_AUTH_TOKEN] (state, token) {
        state.authToken = token;
    },
    [types.UPDATE_USER] (state, {id, idTag, name, usertype}) {
        console.log(id, name, usertype);
        state.username = name;
        state.id = id;
        state.idTag = idTag;
        state.userType = usertype === '1' ? '学生' : '老师';
    },
    [types.UPDATE_MY_PARTICIPATE] (state, myParticipate) {
        state.myParticipate = myParticipate;
    },
    [types.UPDATE_MY_EVENT] (state, myEvent) {
        state.myEvent = myEvent;
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
    },


}