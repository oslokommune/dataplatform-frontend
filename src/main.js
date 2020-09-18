import Vue from 'vue'

import errorHandler from './utils/errorHandler.js'
import App from './App.vue'
import router from './router'
import store from './store'

import analyticsPlugin from './plugins/analytics.js'
import axiosVuePlugin from './plugins/axios.vue.js'

errorHandler(Vue, window)

Vue.config.productionTip = false

Vue.use(analyticsPlugin)
Vue.use(axiosVuePlugin)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
