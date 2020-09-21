/**
 * Store for keeping track of the current authentication status.
 *
 * Also provides actions for logging in, logging out, and refreshing an already
 * authenticated user.
 */

import env from '@/utils/env'
import router from '@/router'

export const state = () => ({
  loadingUser: false,
  user: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.user !== null
  },
}

export const mutations = {
  setLoadingUser(state, loadingUser) {
    state.loadingUser = loadingUser
  },

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

    commit('setLoadingUser', true)
    try {
      const { data } = await this.$axios.get('/userinfo')

      commit('setUser', data)
      commit('setLoadingUser', false)
    } catch (error) {
      commit('setLoadingUser', false)
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
      redirectTo = env.VUE_APP_BASE_URL + router.history.current.fullPath
    }

    const encodedRedirectUrl = encodeURIComponent(redirectTo)
    window.location.href =
      env.VUE_APP_GATEKEEPER_BASE_URL + `/login?redirect=${encodedRedirectUrl}`
  },

  async logout({ commit }) {
    await this.$axios.post('/logout')
    commit('resetUser')
  },
}
