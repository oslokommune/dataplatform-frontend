/**
 * Store for keeping track of the current authentication status.
 *
 * Also provides actions for logging in, logging out, and refreshing an already
 * authenticated user.
 */

import env from '@/utils/env'
import axios from 'axios'
import router from '@/router'

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
      const { data } = await axios.request({
        baseURL: env.VUE_APP_GATEKEEPER_BASE_URL,
        url: '/userinfo',
        method: 'get',
        withCredentials: true,
      })

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

  logout({ commit }) {
    axios.request({
      method: 'post',
      url: env.VUE_APP_GATEKEEPER_BASE_URL + '/logout',
      withCredentials: true,
    })

    commit('resetUser')
  },
}
