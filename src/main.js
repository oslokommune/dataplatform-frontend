import Vue from 'vue'
import Vuex from 'vuex'
import VueGtag from 'vue-gtag'

import env from './utils/env.js'
import errorHandler from './utils/errorHandler.js'
import App from './App.vue'
import router from './router'
import axiosVuePlugin from './plugins/axios.vue.js'
import axiosVuexPlugin from './plugins/axios.vuex.js'
import * as authenticationStore from './store/authentication'
import * as datasetListStore from './modules/DatasetList/store'

errorHandler(Vue, window)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(axiosVuePlugin)

Vue.use(
  VueGtag,
  {
    config: { id: env.VUE_APP_UA_TRACKING_ID },
    enabled: !!env.VUE_APP_UA_TRACKING_ID,
    pageTrackerSkipSamePath: false, // Tracks pages when only their query params change, e.g. pagination
  },
  router
)

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
  plugins: [axiosVuexPlugin],
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
