const PER_PAGE = 20

const getPageCount = (state) => {
  const datasetCount = state.datasetIds.length
  return datasetCount > 0 ? Math.floor(datasetCount / PER_PAGE) : 0
}

export const state = () => ({
  currentPage: 1,
  datasetIds: [],
  datasetsData: [],
  errorCode: null,
  loading: false,
})

export const getters = {
  currentPage(state) {
    return state.currentPage
  },
  datasets(state) {
    return state.datasetsData
  },
  errorCode(state) {
    return state.errorCode
  },
  loading(state) {
    return state.loading
  },
  pageCount(state) {
    return getPageCount(state)
  },
}

export const mutations = {
  nextPage(state) {
    state.currentPage = state.currentPage - 1
  },
  prevPage(state) {
    state.currentPage = state.currentPage + 1
  },
  setDatasetIds(state, datasetIds) {
    state.datasetIds = datasetIds
  },
  setDatasetsData(state, datasetsData) {
    state.datasetsData = datasetsData
  },
  setErrorCode(state, errorCode) {
    state.errorCode = errorCode
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setPage(state, page) {
    state.currentPage = page
  },
}

export const actions = {
  async fetchDatasets({ commit, dispatch }, page) {
    commit('setLoading', true)
    if (page !== undefined) {
      commit('setPage', page)
    }

    try {
      const { data } = await this.$axios.get(
        '/api/dataplatform/simple-dataset-authorizer/datasets'
      )

      const datasetIds = Array.isArray(data) ? data : []
      commit('setDatasetIds', datasetIds)

      dispatch('fetchDatasetsData')
    } catch (error) {
      commit('setErrorCode', error?.response?.status || 'noResponse')
      commit('setLoading', false)
    }
  },
  async fetchDatasetsData({ commit, state }) {
    commit('setLoading', true)

    const start = state.currentPage * PER_PAGE
    const end = start + PER_PAGE
    const currentPageDatasetIds = state.datasetIds.slice(start, end)

    const requests = currentPageDatasetIds.map(({ datasetId }) =>
      this.$axios
        .get(`/api/dataplatform/metadata/datasets/${datasetId}`)
        .then(({ data }) => ({
          id: datasetId,
          ...data,
        }))
        .catch((error) => {
          // Backend does not handle deleted datasets.
          // If dataset is missing, assume it is deleted and remove it from the list.
          if (error?.response?.status) {
            return null
          }

          return {
            id: datasetId,
            errorCode: error?.response?.status || 'noResponse',
          }
        })
    )
    const responses = await Promise.all(requests)

    const datasets = responses.filter((response) => response !== null)

    commit('setDatasetsData', datasets)
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
