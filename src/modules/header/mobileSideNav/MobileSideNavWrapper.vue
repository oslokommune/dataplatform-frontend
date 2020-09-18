<template>
  <div class="MobileSideNavWrapper fullWidthWrapper">
    <div class="sideMenuWrapper">
      <MobileSideNavDrawer @close="close" v-click-outside="close" />
    </div>
  </div>
</template>

<script>
import clickOutside from 'vue-click-outside'
import MobileSideNavDrawer from '@/modules/header/mobileSideNav/MobileSideNavDrawer'

export default {
  components: { MobileSideNavDrawer },
  methods: {
    close() {
      this.$emit('close')
    },
  },

  directives: {
    clickOutside,
  },
}
</script>

<style lang="scss" scoped>
.fullWidthWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
}

.sideMenuWrapper {
  position: absolute;
  right: 0;
  max-width: 400px;
  width: 75%;
  height: 100vh;
}
</style>
