import Vue from 'vue'
import Vuex from 'vuex'

import axiosVuexPlugin from '../plugins/axios.vuex.js'
import * as authenticationStore from '../store/authentication'
import * as datasetListStore from '../modules/DatasetList/store'

Vue.use(Vuex)

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

export default store
