<template>
  <div>
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
    <div v-if="expanded" class="expandedContent">hei</div>
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

tr {
  font-size: 18px;
  border-top: $separator-border;
  overflow-y: auto;

  &:last-of-type {
    border-bottom: $separator-border;
  }
}
</style>
