<template>
  <div>
    <!-- TOOO: Remove, this is only a proof of concept. -->
    <button @click="login()">Logg inn</button>
    <button @click="logout()">Logg ut</button>
    Is authenticated: {{ isAuthenticated }}
    <div v-if="isAuthenticated">You are: {{ user.name }}</div>

    <div class="intro-text">
      <h1>Dine datasett</h1>
      <p>Her finner du informasjon om de datasettene du eier.</p>
    </div>

    <Loader v-if="loading">Henter datasett</Loader>
    <template v-else>
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
            <p>{{ dataset.title || dataset.datasetId }}</p>
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
      <div v-else>
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
import { mapGetters, mapActions, mapState } from 'vuex'

import DatasetStatus from '@/modules/DatasetList/DatasetStatus'
import ExpandableRow from '@/components/ExpandableRow'
import IconDotDotHorizontal from '@/components/icons/IconDotDotHorizontal'
import Loader from '@/components/Loader'

import Pagination from './Pagination'

export default {
  name: 'DatasetList',
  components: {
    DatasetStatus,
    ExpandableRow,
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
  mounted() {
    this.refreshUser()
  },
  computed: {
    currentPage() {
      const pageFromQuery = parseInt(this.$route.query.page, 10)
      return isNaN(pageFromQuery) ? 1 : Math.max(1, pageFromQuery)
    },
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('datasetList', ['loading', 'datasets', 'pageCount']),
  },
  methods: {
    handlePageChange(newPage) {
      this.$router.push({ path: '/', query: { page: newPage } })
    },
    ...mapActions('auth', ['refreshUser', 'login', 'logout']),
    ...mapActions('datasetList', ['fetchDatasets', 'nextPage', 'prevPage']),
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
</style>
