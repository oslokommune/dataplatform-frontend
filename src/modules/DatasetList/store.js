import env from '@/utils/env'

const PER_PAGE = 20

const getPageCount = (state) => {
  const datasetCount = state.datasetIds.length
  return datasetCount > 0 ? Math.floor(datasetCount / PER_PAGE) : 0
}

export const state = () => ({
  currentPage: 1,
  datasetIds: [],
  datasetsData: [],
  loading: false,
})

export const getters = {
  currentPage(state) {
    return state.currentPage
  },
  loading(state) {
    return state.loading
  },
  datasets(state) {
    return state.datasetsData
  },
  pageCount(state) {
    return getPageCount(state)
  },
}

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setDatasetIds(state, datasetIds) {
    state.datasetIds = datasetIds
  },
  setDatasetsData(state, datasetsData) {
    state.datasetsData = datasetsData
  },
  setPage(state, page) {
    state.currentPage = page
  },
  nextPage(state) {
    state.currentPage = state.currentPage - 1
  },
  prevPage(state) {
    state.currentPage = state.currentPage + 1
  },
}

export const actions = {
  async fetchDatasets({ commit, dispatch }, page) {
    commit('setLoading', true)
    if (page !== undefined) {
      commit('setPage', page)
    }

    const { data } = await this.$axios.request({
      baseURL: env.VUE_APP_GATEKEEPER_BASE_URL + '/api/dataplatform',
      url: '/simple-dataset-authorizer/datasets',
      method: 'get',
    })

    commit('setDatasetIds', data)

    dispatch('fetchDatasetsData')
  },
  async fetchDatasetsData({ commit, state }) {
    commit('setLoading', true)

    const start = state.currentPage * PER_PAGE
    const end = start + PER_PAGE
    const currentPageDatasetIds = state.datasetIds.slice(start, end)

    const requests = currentPageDatasetIds.map(({ datasetId }) =>
      this.$axios
        .get(`/api/dataplatform/metadata/datasets/${datasetId}`)
        .then(({ data }) => data)
        .catch((error) => ({
          datasetId,
          requestError: error,
        }))
    )
    const responses = await Promise.all(requests)

    commit('setDatasetsData', responses)
    commit('setLoading', false)
  },
  async nextPage({ commit, state }) {
    const pageCount = getPageCount(state)
    const isAtLastPage = state.currentPage === pageCount
    if (isAtLastPage || pageCount === 1) {
      return
    }

    commit('nextPage')
    commit('fetchDatasetsData', {}, { root: true })
  },
  async prevPage({ commit, state }) {
    const isFirstPage = state.currentPage === 1
    if (isFirstPage) {
      return
    }

    commit('prevPage')
    commit('fetchDatasetsData', {}, { root: true })
  },
}
