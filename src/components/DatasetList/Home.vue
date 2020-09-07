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
          <th>Verktøy</th>
          <th>Status</th>
          <th>Detaljer</th>
        </thead>
        <tbody
          class="dataset-list"
          v-for="datasetobject in filteredDatasets"
          :key="datasetobject.id"
        >
          <tr class="row">
            <td>{{ datasetobject.title }}</td>
            <td>2020-01-01 12:01:01</td>
            <td><IconDotDotHorizontal /></td>
            <td><DatasetStatus /></td>
            <td>
              <div class="stateAndExpandCollapse">
                <ExpandCollapseIcon
                  :expanded="expanded"
                  @click.native.stop="expanded = !expanded"
                />
              </div>
            </td>
            <div v-if="expanded" class="expandedContent">hei</div>
          </tr>
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
import IconDotDotHorizontal from '@/components/icons/IconDotDotHorizontal'
import ExpandCollapseIcon from '@/components/icons/ExpandCollapseIcon'
import DatasetStatus from '@/components/DatasetList/DatasetStatus'
import datasets from '@/assets/mock/dataset.json'

export default {
  name: 'DatasetList',
  components: {
    IconDotDotHorizontal,
    DatasetStatus,
    ExpandCollapseIcon,
  },
  data() {
    return {
      datasets,
      owner: 'Deichman',
      expanded: false,
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
tr {
  font-size: 18px;
  border-top: $separator-border;
  overflow-y: auto;

  &:last-of-type {
    border-bottom: $separator-border;
  }
}

.details dt {
  margin-top: 20px;
  font-weight: 600;
}
</style>
