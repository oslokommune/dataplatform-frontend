import Vue from 'vue'
import VueGtag from 'vue-gtag'

import env from './utils/env.js'
import errorHandler from './utils/errorHandler.js'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosVuePlugin from './plugins/axios.vue.js'

errorHandler(Vue, window)

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
