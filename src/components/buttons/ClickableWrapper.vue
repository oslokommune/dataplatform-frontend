<template>
  <button class="ClickableWrapper" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ClickableWrapper'
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';

.ClickableWrapper {
  padding: 0;
  border: none;
  font-size: inherit;
  font-weight: 300;
  text-align: left;
  background-color: transparent;
}

.BaseButton:focus {
  outline-color: $yellow;
}
</style>
