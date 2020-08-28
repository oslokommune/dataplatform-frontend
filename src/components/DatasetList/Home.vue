<template>
  <div class="dataset-list">
    <!--v-if datasetlist.length > 0-->
    <!--v for datasetlist-->
    <ExpandableRow>
      <template v-slot:title>
        <p>Besøksdata</p>
      </template>
      <template v-slot:state>
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
      <template v-slot:icon>
        <a href="#"> <IconOpenInNew /></a>
      </template>
    </ExpandableRow>
    <!--<div v-else>
        <p>Du har ingen datasett</p>
      </div>-->
  </div>
</template>

<script>
import IconFailedCircle from './components/icons/IconFailedCircle'
//import IconCheckCircle from '@/components/icons/IconCheckCircle'
import IconOpenInNew from './components/icons/IconOpenInNew'
import ExpandableRow from './components/LayoutComponents/ExpandableRow'

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
      title: 'Tittel',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

h2 {
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

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
}
</script>
