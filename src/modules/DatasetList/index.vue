<template>
  <div>
    <div class="intro-text">
      <h1>Dine datasett</h1>
      <p>Her finner du informasjon om de datasettene du eier.</p>
    </div>

    <Loader v-if="loading">Henter datasett</Loader>
    <template v-else>
      <HttpError v-if="errorCode" :error="errorCode">
        Kunne ikke hente datasett
      </HttpError>

      <div
        class="dataset-list"
        v-if="!datasets !== null && datasets.length > 0"
      >
        <ExpandableRow :header="true">
          <template v-slot:title>
            <p>Tittel</p>
          </template>
          <template v-slot:date>
            <p>Sist oppdatert</p>
          </template>
          <template v-slot:status>
            <p>Status</p>
          </template>
          <template v-slot:edit>
            <p>Verktøy</p>
          </template>
          <template v-slot:details>
            <p>Detaljer</p>
          </template>
        </ExpandableRow>

        <ExpandableRow v-for="dataset in datasets" :key="dataset.id">
          <template v-slot:title>
            <span v-if="dataset.errorCode" class="error-text">
              {{ dataset.title || dataset.id }}
              <br />
              NB! Datasettet er slettet
            </span>
            <router-link
              v-else
              :to="{ name: 'Datasett', params: { id: dataset.id } }"
              >{{ dataset.title || dataset.id }}</router-link
            >
          </template>
          <template v-slot:date>
            <!-- TODO Replace static value -->
            <p>2020-01-01 12:01:01</p>
          </template>
          <template v-slot:status>
            <DatasetStatus />
          </template>
          <template v-slot:expandedContent>
            <!-- TODO Replace static values -->
            <dl class="details">
              <dt>Status id:</dt>
              <dd>12345</dd>

              <dt>Feilmelding:</dt>
              <dd>Feil struktur</dd>
            </dl>
          </template>
          <template v-slot:edit>
            <a href="#"> <IconDotDotHorizontal /></a>
          </template>
        </ExpandableRow>
      </div>
      <div v-else-if="!errorCode">
        <p>Du har ingen datasett.</p>
      </div>

      <Pagination
        v-if="pageCount > 1"
        @setPage="handlePageChange"
        :currentPage="currentPage"
        :pageCount="pageCount"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import DatasetStatus from '@/modules/DatasetList/DatasetStatus'
import ExpandableRow from '@/components/ExpandableRow'
import HttpError from '@/components/Alert/HttpError'
import IconDotDotHorizontal from '@/components/icons/IconDotDotHorizontal'
import Loader from '@/components/Loader'

import Pagination from './Pagination'

export default {
  name: 'DatasetList',

  components: {
    DatasetStatus,
    ExpandableRow,
    HttpError,
    IconDotDotHorizontal,
    Loader,
    Pagination,
  },

  created() {
    this.fetchDatasets(this.currentPage)
  },

  watch: {
    $route(to, from) {
      if (to.query.page !== from.query.page) {
        this.fetchDatasets(this.currentPage)
      }
    },
  },

  computed: {
    currentPage() {
      const pageFromQuery = parseInt(this.$route.query.page, 10)
      return isNaN(pageFromQuery) ? 1 : Math.max(1, pageFromQuery)
    },
    ...mapGetters('datasetList', [
      'errorCode',
      'loading',
      'datasets',
      'pageCount',
    ]),
  },

  methods: {
    ...mapActions('datasetList', ['fetchDatasets', 'nextPage', 'prevPage']),
    handlePageChange(newPage) {
      this.$router.push({ path: '/', query: { page: newPage } })
    },
  },
}
</script>

<style lang="scss" scoped>
.intro {
  font-size: $font-size-ingress;
}

.dataset-list {
  margin-top: 4em;
}

.details dt {
  margin-top: 20px;
  font-weight: 600;
}

.IconDotDotHorizontal {
  margin-right: 1em;
}

.error-text {
  color: $ok-state-danger;
}
</style>
