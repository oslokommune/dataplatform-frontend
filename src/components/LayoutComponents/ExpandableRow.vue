<!--
This component defines the expand and collapse functionality for a row in a list.
It as three slots for injecting content: title and state, which is always shown, and expandedContent
shows only when the row is expanded.
-->
<template>
  <div class="expandable-row">
    <div class="expand-collapse">
      <div class="user">
        <slot name="title" />
      </div>
      <div class="user">
        <slot name="state" />
      </div>
      <div class="stateAndExpandCollapse">
        <div class="user">
          <slot name="status" />
        </div>
        <div class="icon">
          <slot name="icon" />
        </div>
        <ExpandCollapseIcon
          :expanded="expanded"
          @click.native.stop="expanded = !expanded"
        />
      </div>
    </div>

    <div v-if="expanded" class="expandedContent">
      <slot name="expandedContent" />
    </div>
  </div>
</template>

<script>
import ExpandCollapseIcon from './components/icons/ExpandCollapseIcon'

export default {
  name: 'ExpandableRow',
  components: {
    ExpandCollapseIcon,
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
@import '@/assets/mixins';

.expandable-row {
  font-size: 18px;
  padding: 0.3em 0;
  padding-right: 0.8em;
  border-top: $separator-border;
  text-align: left;

  &:last-of-type {
    border-bottom: $separator-border;
  }
}

.expand-collapse {
  display: flex;
  width: 100%;

  > * {
    display: flex;
    align-items: center;
  }

  > div {
    width: 50%;
  }

  .user {
    padding-right: 1em;

    > a {
      @include textEllipsis;
      display: block;
    }
  }

  .stateAndExpandCollapse {
    display: flex;
    justify-content: space-between;
  }
}
</style>
