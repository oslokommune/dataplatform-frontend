<!--
This component defines the expand and collapse functionality for a row in a list.
It as three slots for injecting content: title and state, which is always shown, and expandedContent
shows only when the row is expanded.
-->
<template>
  <div class="expandable-row" :class="{ header: header }">
    <div class="expand-collapse">
      <div class="field">
        <slot name="title" />
      </div>
      <div class="field">
        <slot name="date" />
      </div>
      <div class="stateAndExpandCollapse">
        <div class="field">
          <slot name="status" />
        </div>
        <div class="field">
          <slot name="edit" />
        </div>
        <div class="field" v-if="header"><slot name="details" /></div>
        <ExpandCollapseIcon
          :expanded="expanded"
          @click.native.stop="expanded = !expanded"
          v-if="!header"
        />
      </div>
    </div>

    <div v-if="expanded" class="expandedContent">
      <slot name="expandedContent" />
    </div>
  </div>
</template>

<script>
import ExpandCollapseIcon from '@/components/icons/ExpandCollapseIcon'

export default {
  name: 'ExpandableRow',
  components: {
    ExpandCollapseIcon,
  },
  props: {
    header: {
      type: Boolean,
      default: false,
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
.expandable-row {
  font-size: 18px;
  padding: 0.8em 0 0.3em;
  border-top: $separator-border;
  text-align: left;
  margin-top: 1em;
  overflow-y: auto;

  &:last-of-type {
    border-bottom: $separator-border;
  }
  &:nth-child(2) {
    border-top: 2px solid black;
  }
}
.header {
  border-top: 0;

  font-weight: bold;
}
.expand-collapse {
  display: flex;
  width: 100%;

  > * {
    display: flex;
  }

  > div {
    width: 50%;
  }

  .field {
    padding-right: 0.8em;

    > a {
      display: block;
    }
  }

  .stateAndExpandCollapse {
    display: flex;
    justify-content: space-between;
  }
}
</style>
