import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions";
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
        id: '',
        username: '',
        userType: '',
        activeTab: 0,
        showLoginSheet: false,
        mainPage: true
    },
    mutations,
    actions
})
