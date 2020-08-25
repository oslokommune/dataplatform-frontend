<template>
  <div id="app">
    <header>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </header>
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
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
  box-sizing: border-box;
  margin: 0;
  padding: 8px;
  min-height: 100%;
  background: #ffffff;
  color: $font-color;
  line-height: 1.5;
  font-weight: 300;
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
