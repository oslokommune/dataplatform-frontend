import axios from '../utils/axios.js'

// Access this.$axios within store
const axiosVuexPlugin = (store) => {
  store.$axios = axios
}
export default axiosVuexPlugin
