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

function endsWith(x, y) {
  return x.lastIndexOf(y) === x.length - y.length
}

console.log(endsWith(['1', '2', '3'], '2'))
console.log(endsWith(['1', '2', '3'], '3'))

const regex = new RegExp('(^s*)my-marker(s*$)')
const isMyMarkerText = regex.test('asdfasdfasdf')
console.log(isMyMarkerText)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
