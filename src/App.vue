<template>
  <div id="app">
    <header>
      <router-link to="/">Datasetliste</router-link> |
      <router-link to="/datasetdetails">Dataset-detaljer</router-link>
    </header>
    <main class=".centered-container full-width">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script>
import Footer from './components/BaseComponents/Footer'
export default {
  components: {
    Footer
  }
}
</script>
<style lang="scss">
@import 'assets/variables';
@import 'assets/common';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  text-align: center;
}
main {
  text-align: center;
}
a {
  color: $font-color;
}
button {
  cursor: pointer;
}
</style>
