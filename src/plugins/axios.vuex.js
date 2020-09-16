import axios from '../utils/axios'

const axiosVuexPlugin = (store) => {
  store.$axios = axios
}

export default axiosVuexPlugin
