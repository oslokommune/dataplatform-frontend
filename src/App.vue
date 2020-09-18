<template>
  <div id="app" class="page">
    <Header />
    <main class="centered-container full-height">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script>
import Footer from './app/Footer'
import auth from '@/mixins/auth'
import 'normalize.css'
import Header from './modules/header/Header'

export default {
  components: {
    Header,
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

.Header {
  margin-bottom: $header-bottom-margin;
}

a {
  color: $font-color;
}
button {
  cursor: pointer;
}
</style>
