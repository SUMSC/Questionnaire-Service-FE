import Vue from 'vue'
import './plugin/vant'
import './plugin/mand-mobile'
import './plugin/vue-awesome-swiper'
import App from './App'
import router from './router'
import store from './store/'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
