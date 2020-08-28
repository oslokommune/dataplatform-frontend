<template>
  <div class="dataset-list" v-if="datasets.length > 0">
    <!--v for datasetlist-->
    <div class="intro">
      <h1>Dine datasett</h1>
      <p>Her finner du informasjon om de datasettene du eier</p>
    </div>
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
        <IconFailedCircle />
        <span> Feil </span>
      </template>
      <template v-slot:expandedContent>
        <div class="details">
          <b>Status id:</b>
          <p>12345</p>

          <b>Feilmelding:</b>
          <p>Feil struktur</p>
        </div>
      </template>
      <template v-slot:edit>
        <a href="#"> <IconOpenInNew /></a>
      </template>
    </ExpandableRow>
  </div>
  <div v-else>
    <p>Du har ingen datasett</p>
  </div>
</template>

<script>
import IconFailedCircle from '@/components/icons/IconFailedCircle'
//import IconCheckCircle from '@/components/icons/IconCheckCircle'
import IconOpenInNew from '@/components/icons/IconOpenInNew'
import ExpandableRow from '@/components/LayoutComponents/ExpandableRow'
import datasets from '@/assets/mock/dataset.json'
export default {
  name: 'DatasetList',
  components: {
    ExpandableRow,
    IconFailedCircle,
    //IconCheckCircle,
    IconOpenInNew,
  },
  data() {
    return {
      datasets: datasets,
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
.intro {
  text-align: left;
}
h1 {
  margin-bottom: 0.3em;
}
.IconCheckCircle {
  color: $green;
}
.IconFailedCircle {
  color: $red;
}
.details {
  margin-top: 1em;

  font-weight: 500;
}
</style>
