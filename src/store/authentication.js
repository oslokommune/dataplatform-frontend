/**
 * Store for keeping track of the current authentication status.
 *
 * Also provides actions for logging in, logging out, and refreshing an already
 * authenticated user.
 */

import env from '@/utils/env'
import Axios from 'axios'
import router from '@/router'

const axios = Axios.create({
  baseURL: env.VUE_APP_GATEKEEPER_BASE_URL,
  withCredentials: true,
})

export const state = () => ({
  user: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.user !== null
  },
}

export const mutations = {
  resetUser(state) {
    state.user = null
  },

  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async refreshUser({ commit, getters }) {
    if (getters['isAuthenticated']) {
      return getters['loggedInUser']
    }

    try {
      const { data } = await axios.get('/userinfo')

      commit('setUser', data)
    } catch (error) {
      if (error.response) {
        if (401 === error.response.status) {
          return null // Ignore 401, it's expected due to many users not being logged in
        }
        throw error
      }
    }

    return getters['loggedInUser']
  },

  login(context, redirectTo) {
    if (!redirectTo) {
      console.log(router.history.current.fullPath)
      redirectTo = env.VUE_APP_BASE_URL + router.history.current.fullPath
    }

    const encodedRedirectUrl = encodeURIComponent(redirectTo)
    window.location.href =
      env.VUE_APP_GATEKEEPER_BASE_URL + `/login?redirect=${encodedRedirectUrl}`
  },

  async logout({ commit }) {
    await axios.post('/logout')
    commit('resetUser')
  },
}
