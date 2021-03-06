import axios from '../utils/axios.js'

// Access axios with this.$axios from all Vue-intances and components
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  },
}
