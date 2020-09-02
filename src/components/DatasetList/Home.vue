<!---Show datasetlist 
    TODO: Get real data
--->
<template>
  <div>
    <div class="intro">
      <h1>Dine datasett</h1>
      <p>Her finner du informasjon om de datasettene du eier</p>
    </div>
    <div class="dataset-list" v-if="datasets.length > 0">
      <ExpandableRow
        v-for="datasetobject in filteredDatasets"
        :key="datasetobject.id"
      >
        <template v-slot:title>
          <p>{{ datasetobject.title }}</p>
        </template>
        <template v-slot:date>
          <p>2020-01-01 12:01:01</p>
        </template>
        <template v-slot:status>
          <DatasetStatus />
        </template>
        <template v-slot:expandedContent>
          <dl class="details">
            <dt>Status id:</dt>
            <dd>12345</dd>

            <dt>Feilmelding:</dt>
            <dd>Feil struktur</dd>
          </dl>
        </template>
        <template v-slot:edit>
          <a href="#"> <IconOpenInNew /></a>
        </template>
      </ExpandableRow>
    </div>
    <div v-else>
      <p>Du har ingen datasett</p>
    </div>
  </div>
</template>

<script>
import IconOpenInNew from '@/components/icons/IconOpenInNew'
import ExpandableRow from '@/components/LayoutComponents/ExpandableRow'
import DatasetStatus from '@/components/DatasetList/DatasetStatus'
import datasets from '@/assets/mock/dataset.json'
export default {
  name: 'DatasetList',
  components: {
    ExpandableRow,
    IconOpenInNew,
    DatasetStatus,
  },
  data() {
    return {
      datasets,
      owner: 'Deichman',
    }
  },
  computed: {
    filteredDatasets() {
      return this.datasets.filter((dataset) => {
        return dataset.publisher === this.owner
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
.intro p {
  font-size: $font-size-ingress;
}

.details dt {
  margin-top: 20px;
  font-weight: 600;
}
</style>
