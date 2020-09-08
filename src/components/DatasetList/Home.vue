<!---Show datasetlist 
    TODO: Get real data
--->
<template>
  <div>
    <!-- TOOO: Remove, this is only a proof of concept. -->
    <button @click="login">Logg inn</button>
    Is authenticated: {{ isAuthenticated }}
    <div v-if="isAuthenticated">You are: {{ user.name }}</div>

    <div class="intro">
      <h1>Dine datasett</h1>
      <p>Her finner du informasjon om de datasettene du eier</p>
    </div>
    <div v-if="datasets">
      <table>
        <thead>
          <th>Tittel</th>
          <th>Sist oppdatert</th>
          <th>Status</th>
          <th>Verktøy</th>
          <th>Detaljer</th>
        </thead>
        <tbody class="dataset-list">
          <TableRow
            v-for="datasetobject in filteredDatasets"
            :key="datasetobject.id"
            :datasetobject="datasetobject"
          />
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Du har ingen datasett</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import TableRow from '@/components/DatasetList/TableRow'
import datasets from '@/assets/mock/dataset.json'

export default {
  name: 'DatasetList',
  components: {
    TableRow,
  },
  data() {
    return {
      datasets,
      owner: 'Deichman',
    }
  },
  mounted() {
    this.refreshUser()
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuthenticated']),
    filteredDatasets() {
      return this.datasets.filter((dataset) => {
        return dataset.publisher === this.owner
      })
    },
  },
  methods: {
    ...mapActions('auth', ['refreshUser']),
    /*
     * TODO: Replace this with `login` from the authentication store
     * once the environment variables are in place.
     */
    login() {
      const encodedRedirectURL = encodeURIComponent('http://localhost:8080')
      window.location = `https://gatekeeper.k8s-test.oslo.kommune.no/login?redirect=${encodedRedirectURL}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
@import '@/assets/common';

.intro p {
  font-size: $font-size-ingress;
}
</style>
