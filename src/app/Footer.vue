<template>
  <footer>
    <div class="centered-container">
      <div class="logo">
        <IconOsloLogo />
      </div>
      <div class="footer-content">Dataplattform</div>
    </div>
  </footer>
</template>

<script>
import IconOsloLogo from '../components/icons/IconOsloLogo'

export default {
  components: {
    IconOsloLogo,
  },
}
</script>

<style lang="scss" scoped>
footer {
  border-top: $separator-border;
  padding-top: 1em;
  padding-bottom: 4em;
  margin-top: $footer-top-margin;
}
.centered-container {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.logo {
  flex-grow: 1;
}

.footer-content {
  margin-top: 1em;
  margin-right: 2em;

  @media (max-width: 900px) {
    width: 100%;
  }
}

.IconOsloLogo {
  width: 88px;
  height: 46px;
}
</style>
