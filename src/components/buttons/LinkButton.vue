<template>
  <button class="LinkButton" @click.stop.prevent="callbackFunction()">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    callbackFunction: Function
  }
}
</script>

<style lang="scss" scoped>
button {
  text-decoration: underline;
  padding: 0;
  border: none;
  font-size: inherit;
  font-weight: 300;
  text-align: left;
  background-color: transparent;
}
</style>
