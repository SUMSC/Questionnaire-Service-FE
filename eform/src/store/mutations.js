import * as types from './mutation-types'
import {log} from "../utils/lib";

export default {
    // 更新用户 ID
    [types.UPDATE_USER_ID] (state, id) {
        state.id = id
    },
    // 更新用户 JWT
    [types.UPDATE_AUTH_TOKEN] (state, token) {
        state.authToken = token;
    },
    // 更新用户数据
    [types.UPDATE_USER] (state, {id, idTag, name, usertype}) {
        log(id, name, usertype);
        state.username = name;
        state.id = id;
        state.idTag = idTag;
        state.userType = usertype === '1' ? '学生' : '老师';
    },
    // 更新我参与的活动
    [types.UPDATE_MY_PARTICIPATE] (state, myParticipate) {
        state.myParticipate = myParticipate;
    },
    // 更新我创建的活动
    [types.UPDATE_MY_EVENT] (state, myEvent) {
        state.myEvent = myEvent;
    },
    // 更新当前页面需要显示的答案
    [types.UPDATE_CURRENT_ANSWER] (state, {index, answer}) {
        state.currentAnswer[index] = answer;
    },
    // 初始化答案
    [types.INIT_ANSWER] (state, {form}) {
        state.currentAnswer = form;
    },
    // 更新当前页面需要显示的表单
    [types.UPDATE_CURRENT_FORM] (state, form) {
        state.currentForm = form;
    },
    // 设置底部栏当前高亮
    [types.SET_ACTIVE_TAB] (state, activeTab) {
        if (state.activeTab === activeTab) return;
        state.activeTab = activeTab;
    },
    // 弹出登录框
    [types.SHOW_LOGIN_SHEET] (state, flag) {
        state.showLoginSheet = flag;
    },
    //
    [types.CHANGE_PAGE_TYPE] (state, flag) {
        state.mainPage = flag;
    },


}