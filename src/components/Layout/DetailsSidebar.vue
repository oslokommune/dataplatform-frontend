<template>
  <aside class="side-bar">
    <div class="links">
      <slot name="links" />
    </div>
    <div class="buttons">
      <slot name="buttons" />
    </div>
  </aside>
</template>

<script>
export default {
  name: 'DetailsSidebar',
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.side-bar {
  margin-top: 2em;
  padding-top: 110px;
  width: 215px;
  margin-right: 95px;

  .links {
    margin-bottom: 4em;

    a {
      display: block;
      padding: 1em;

      text-decoration: none;

      &.active {
        background-color: $background-secondary;
        font-weight: bold;
      }
    }
  }

  .buttons {
    * {
      margin-bottom: 1em;
      width: 100%;
    }
  }
}
</style>
