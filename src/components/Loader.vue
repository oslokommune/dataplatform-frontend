<template>
  <div class="loader" :class="center && 'loader--center'">
    <span class="loader__icon"><IconSpinner /></span>
    <span class="loader__text"><slot></slot></span>
  </div>
</template>

<script>
import IconSpinner from '@/components/icons/IconSpinner'

export default {
  name: 'Loader',
  props: {
    center: {
      default: false,
      type: Boolean,
    },
  },
  components: {
    IconSpinner,
  },
}
</script>

<style lang="scss" scoped>
.loader {
  align-items: center;
  display: flex;
  font-size: $font-size-md;
  margin-top: $space-md;

  &--center {
    justify-content: center;
  }

  &__icon {
    line-height: 0;
    margin-right: 0.5rem;
  }
}
</style>
