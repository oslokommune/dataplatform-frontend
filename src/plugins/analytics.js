import VueGtag from 'vue-gtag'

import router from '../router'
import env from '../utils/env.js'

export default {
  install: function (Vue) {
    Vue.use(
      VueGtag,
      {
        config: { id: env.VUE_APP_UA_TRACKING_ID },
        enabled: !!env.VUE_APP_UA_TRACKING_ID,
        pageTrackerSkipSamePath: false, // Tracks pages when only their query params change, e.g. pagination
      },
      router
    )
  },
}
