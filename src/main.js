import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'
import AxiosPlugin from './utils/axios.js'

import * as authenticationStore from './store/authentication'
import * as datasetListStore from './modules/DatasetList/store'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(AxiosPlugin)

const store = new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      ...authenticationStore,
    },
    datasetList: {
      namespaced: true,
      ...datasetListStore,
    },
  },
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
