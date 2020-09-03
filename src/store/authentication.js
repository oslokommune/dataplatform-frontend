import axios from "axios"

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated(state) {
    return state.user !== null
  },
  loggedInUser(state) {
    return state.user
  }
}

export const mutations = {
  resetUser(state) {
    state.user = null
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  async refreshUser({ commit, getters }) {
    if (getters['isAuthenticated']) return getters['loggedInUser']

    try {
      const { data } = await axios.request({
        baseURL: 'http://localhost:4554',
        url: '/userinfo',
        method: 'get',
        withCredentials: true
      })

      commit('setUser', data)
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (process.server)
              console.error(
                `Couldn't reach Gatekeeper on url http://localhost:4554`
              )
            throw error
          case 401:
            return // Ignore 401, its expected due to many users not being logged in
          default:
            throw error
        }
      }
    }

    return getters['loggedInUser']
  },
  async login(context, redirectTo) {
    if (!redirectTo)
      redirectTo = this.$env.BASE_URL + this.$router.history.current.fullPath

    const encodedRedirectUrl = encodeURIComponent(redirectTo)
    const url =
      this.$env.GATEKEEPER_URL + `/login?redirect=${encodedRedirectUrl}`

    await handleRedirect(this.app.context.redirect, url)
  },
  async logout({ commit }) {
    await axios.request({
      method: 'post',
      url: this.$env.GATEKEEPER_URL + '/logout',
      withCredentials: true
    })

    commit('resetUser', null)

    await handleRedirect(this.app.context.redirect, this.app.$env.BASE_URL)
  }
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
    await new Promise(resolve => {
      setTimeout(() => resolve(), 60000)
    })
  }
}
