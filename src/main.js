import Vue from 'vue'
import store from './store/store.js'
import App from './App.vue'
import router from './router/router'
import VueMask from 'v-mask'

Vue.use(VueMask);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
