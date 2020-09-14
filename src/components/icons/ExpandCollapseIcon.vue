<template>
  <div class="expand-collapse-icon">
    <BaseClickableIcon v-if="!expanded">
      <IconExpandMore />
    </BaseClickableIcon>

    <BaseClickableIcon v-else>
      <IconExpandLess />
    </BaseClickableIcon>
  </div>
</template>

<script>
import IconExpandMore from '@/components/icons/IconExpandMore'
import IconExpandLess from '@/components/icons/IconExpandLess'
import BaseClickableIcon from '@/components/buttons/BaseClickableIcon'

export default {
  name: 'ExpandCollapseIcon',
  components: {
    IconExpandMore,
    IconExpandLess,
    BaseClickableIcon,
  },
  props: {
    expanded: Boolean,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.IconExpandMore,
.IconExpandLess {
  width: 20px;
  height: 20px;
  color: $ok-darkblue;
}
</style>
