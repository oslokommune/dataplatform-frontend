import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

import * as authenticationStore from './store/authentication'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      ...authenticationStore,
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
