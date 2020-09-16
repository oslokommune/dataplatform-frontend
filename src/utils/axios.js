import Axios from 'axios'
import env from './env'

export default Axios.create({
  baseURL: env.VUE_APP_GATEKEEPER_BASE_URL,
  withCredentials: true,
})
