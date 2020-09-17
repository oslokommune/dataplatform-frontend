<template>
  <div class="dataset-editions">
    <div v-if="error">
      <div v-if="error === 'notFound'">Kunne ikke finne utgivelser.</div>
    </div>

    <p v-if="!loading && editions && editions.length === 0">
      Ingen utgivelser.
    </p>

    <table v-if="editions && editions.length > 0">
      <thead>
        <tr>
          <th>Beskrivelse</th>
          <th>Opprettet</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="edition in editions" :key="edition.Id">
          <td>{{ edition.description || edition.Id }}</td>
          <td>{{ formatDate(edition.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import format from 'date-fns/format'

import env from '@/utils/env'

const sortAscending = (field) => (a, b) => {
  return b[field] - a[field]
}

export default {
  name: 'Editions',
  props: {
    datasetId: String,
  },
  data() {
    return {
      editions: [],
      error: null,
      loading: false,
    }
  },
  created() {
    this.fetchEditions()
  },
  watch: {
    datasetId: 'fetchEditions',
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return ''
      }
      return format(date, "dd.MM.yyyy, 'kl.' HH.mm")
    },
    async fetchEditions() {
      this.error = null
      this.editions = []

      if (this.datasetId) {
        this.loading = true

        const { data: editions } = await this.$axios.request({
          baseURL: env.VUE_APP_GATEKEEPER_BASE_URL + '/api/dataplatform',
          url: `/metadata/datasets/${this.datasetId}/versions/1/editions`,
          method: 'get',
        })

        this.loading = false
        if (!editions) {
          this.error = 'notFound'
        } else {
          const parsedEditions = editions.map((edition) => ({
            ...edition,
            createdAt: edition.edition ? new Date(edition.edition) : 0,
          }))

          const parsedAndSortedEditions = parsedEditions.sort(
            sortAscending('createdAt')
          )

          this.editions = parsedAndSortedEditions
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;

  th {
    border-bottom: 2px solid black;
    padding: 0.75em 1em 1.3em 0;
    text-align: left;
  }

  td {
    border-bottom: $separator-border;
    padding: 1.3em 1em 1.3em 0;
  }
}
</style>
