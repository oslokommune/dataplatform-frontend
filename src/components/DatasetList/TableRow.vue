<template>
  <div class="table-row">
    <tr>
      <td>{{ datasetobject.title }}</td>
      <td>2020-01-01 12:01:01</td>
      <td><DatasetStatus /></td>
      <td><IconDotDotHorizontal /></td>
      <td>
        <div class="stateAndExpandCollapse">
          <ExpandCollapseIcon
            :expanded="expanded"
            @click.native.stop="expanded = !expanded"
          />
        </div>
      </td>
    </tr>
    <div v-if="expanded" class="expandedContent">
      <dl class="details">
        <dt>Status id:</dt>
        <dd>12345</dd>

        <dt>Feilmelding:</dt>
        <dd>Feil struktur</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import IconDotDotHorizontal from '@/components/icons/IconDotDotHorizontal'
import ExpandCollapseIcon from '@/components/icons/ExpandCollapseIcon'
import DatasetStatus from '@/components/DatasetList/DatasetStatus'
export default {
  components: {
    IconDotDotHorizontal,
    DatasetStatus,
    ExpandCollapseIcon,
  },
  props: {
    datasetobject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables';
@import '@/assets/common';
.table-row {
  display: contents;
}
.IconDotDotHorizontal {
  margin-left: 1em;
}

td {
  font-size: 18px;
  border-top: $separator-border;
  text-align: left;
  margin-top: 3em;
  overflow-y: auto;
}

.details dt {
  margin-top: 20px;
  font-weight: 600;
}
</style>
