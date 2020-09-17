<template>
  <div class="dataset-editions">
    <HttpError v-if="errorCode" :error="errorCode">
      Kunne ikke hente utgivelser
    </HttpError>
    <template v-else>
      <p v-if="loading">Henter utgivelser …</p>

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
    </template>
  </div>
</template>

<script>
import format from 'date-fns/format'

import HttpError from '@/components/Alert/HttpError'

const sortAscending = (field) => (a, b) => {
  return b[field] - a[field]
}

export default {
  name: 'Editions',
  components: {
    HttpError,
  },
  props: {
    datasetId: String,
  },
  data() {
    return {
      editions: [],
      errorCode: null,
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
      this.errorCode = null
      this.editions = []

      if (this.datasetId) {
        this.loading = true

        try {
          const { data: editions } = await this.$axios.get(
            `/api/dataplatform/metadata/datasets/${this.datasetId}/versions/1/editions`
          )

          if (!Array.isArray(editions)) {
            this.errorCode = 404
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
        } catch (error) {
          this.errorCode = error?.response?.status || 'noResponse'
        }

        this.loading = false
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
