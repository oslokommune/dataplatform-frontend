<template>
  <button class="BaseClickableIcon">
    <slot />
  </button>
</template>

<script>
export default {
  // This component wraps an icon and makes sure it's at least 44*44 px for accessibility
  name: 'BaseClickableIcon'
}
</script>

<style lang="scss" scoped>
.BaseClickableIcon {
  background-color: transparent;
  cursor: pointer;
  border: none;
  min-height: 44px;
  min-width: 44px;
}
</style>
