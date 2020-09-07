/**
 * Store for keeping track of the current authentication status.
 *
 * Also provides actions for logging in, logging out, and refreshing an already
 * authenticated user.
 */

/*
 * TODO: Make axios available on $this.axios so we don't have to
 * import it everywhere.
 */
import axios from 'axios'

export const state = () => ({
  user: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.user !== null
  },
  loggedInUser(state) {
    return state.user
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
        // TODO: Fetch this from an environment variable.
        baseURL: 'https://gatekeeper.k8s-test.oslo.kommune.no',
        url: '/userinfo',
        method: 'get',
        withCredentials: true,
      })

      commit('setUser', data)
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (process.server) {
              // TODO: Fetch this from an environment variable
              console.error(
                `Couldn't reach Gatekeeper on url https://gatekeeper.k8s-test.oslo.kommune.no`
              )
            }
            throw error
          case 401:
            return null // Ignore 401, it's expected due to many users not being logged in
          default:
            throw error
        }
      }
    }

    return getters['loggedInUser']
  },
  async login(context, redirectTo) {
    if (!redirectTo) {
      redirectTo = this.$env.BASE_URL + this.$router.history.current.fullPath
    }

    const encodedRedirectUrl = encodeURIComponent(redirectTo)
    const url =
      this.$env.GATEKEEPER_URL + `/login?redirect=${encodedRedirectUrl}`

    await handleRedirect(this.app.context.redirect, url)
  },
  async logout({ commit }) {
    await axios.request({
      method: 'post',
      url: this.$env.GATEKEEPER_URL + '/logout',
      withCredentials: true,
    })

    commit('resetUser', null)

    await handleRedirect(this.app.context.redirect, this.app.$env.BASE_URL)
  },
}

async function handleRedirect(redirectFn, target) {
  try {
    redirectFn(target)
  } catch (error) {
    if (error.message !== 'ERR_REDIRECT') throw error
    /*
     * If client side, the redirect function throws an error. In this event, we have to
     * stall until the actual window.location.replace happens.
     * This promise will in 99.9% of all cases never resolve due to redirection occurring
     */
    await new Promise((resolve) => {
      window.setTimeout(() => resolve(), 60000)
    })
  }
}
