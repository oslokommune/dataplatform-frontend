<template>
  <main>
    <section>
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view />
      </div>
      <Footer />
    </section>
  </main>
</template>
<script>
import Footer from "./views/Footer";
export default {
  components: {
    Footer,
  },
};
</script>
<style lang="scss">
@import "assets/variables";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html {
  height: 100%;
  font-family: $font-family;
  word-spacing: 1px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  // Stop scrollbar from making the page jump to the side as scrollbar is enabled/disabled
  width: 100vw;
  overflow-x: hidden;
}

body {
  min-height: 100%;
  background: #ffffff;
  color: $font-color;
  line-height: 1.5;
  font-weight: 300;
}
a {
  color: $font-color;
}
button {
  cursor: pointer;
}
</style>
