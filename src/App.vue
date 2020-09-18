<template>
  <div id="app" class="page">
    <header>
      <nav></nav>
    </header>
    <main class="centered-container full-height">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script>
import Footer from './app/Footer'
import 'normalize.css'
export default {
  components: {
    Footer,
  },

  mixins: [auth],

  mounted() {
    this.refreshUser()
  },
}
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  text-align: center;
}
a {
  color: $font-color;
}
button {
  cursor: pointer;
}
</style>
