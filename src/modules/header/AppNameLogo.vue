<template>
  <router-link id="homeLink" class="AppNameLogo" to="/" @click.native="blur()">
    <span>Mine datasett</span>
  </router-link>
</template>

<script>
export default {
  methods: {
    // Blur the home link on click to remove focus after click without re-render
    blur() {
      document.getElementById('homeLink').blur()
    },
  },
}
</script>

<style lang="scss" scoped>
.AppNameLogo {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  span {
    font-size: 24px;
    margin: 0;
  }
}
</style>
