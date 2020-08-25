<template>
  <button
    :class="{
      primary,
      secondary,
      primaryOnDark,
      secondaryOnDark,
      danger,
      remove,
      disabled
    }"
    class="BaseButton"
    v-on="$listeners"
  >
    <slot v-show="!showLoader" />
    <div class="contentHider" :class="{ showLoader }">
      <IconSpinner v-show="showLoader" />
    </div>
  </button>
</template>

<script>
import IconSpinner from '~/components/icons/IconSpinner'

export default {
  name: 'BaseButton',
  components: { IconSpinner },
  props: {
    primary: Boolean,
    secondary: Boolean,
    primaryOnDark: Boolean,
    secondaryOnDark: Boolean,
    danger: Boolean,
    remove: Boolean,
    disabled: Boolean,
    showLoader: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';
@import 'assets/mixins';

.BaseButton {
  @include buttonStyle;
  fill: currentColor; //svg
  position: relative;
}

.BaseButton:focus {
  outline-color: $yellow;
}

.contentHider {
  position: absolute;
  background: transparent;
  transition: background 0.2s ease-out;
  width: 100%;
  height: 100%;
  @include flexCentering;

  &.showLoader {
    background: inherit;
  }
}
</style>
