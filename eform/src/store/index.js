import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"
import notice from "./modules/notice"
import search from "./modules/search"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        notice,
        search
    },
    state: {
        id: '1',
        idTag: '1234567890',
        username: '测试用户',
        userType: '学生',
        // id: '',
        // idTag: '',
        // username: '',
        // userType: '',
        activeTab: 0,
        showLoginSheet: false,
        mainPage: true,
        myParticipate: [],
        myEvent: [],
        authToken: '',
        currentForm: {},
        currentAnswer: {
            "type": "answer",
            "form": {}
        }
    },
    mutations,
    actions
})
