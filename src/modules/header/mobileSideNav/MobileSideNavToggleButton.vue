<template>
  <div class="MobileSideNavToggleButton">
    <BaseClickableIcon
      class="menuButton"
      primary
      @click.native.stop="toggleSideMenu"
    >
      <IconHamburgerMenu />
    </BaseClickableIcon>

    <transition name="slide-fade">
      <MobileSideNavWrapper
        v-if="sideMenuVisible"
        @close="toggleSideMenu"
        v-click-outside="toggleSideMenu"
      />
    </transition>
  </div>
</template>

<script>
import BaseClickableIcon from '@/components/buttons/BaseClickableIcon'
import IconHamburgerMenu from '@/modules/header/mobileSideNav/IconHamburgerMenu'
import MobileSideNavWrapper from '@/modules/header/mobileSideNav/MobileSideNavWrapper'
import auth from '@/mixins/auth'
import clickOutside from 'vue-click-outside'

export default {
  components: { MobileSideNavWrapper, BaseClickableIcon, IconHamburgerMenu },

  mixins: [auth],

  data: () => ({
    sideMenuVisible: false,
  }),

  methods: {
    toggleSideMenu() {
      this.sideMenuVisible = !this.sideMenuVisible
    },
  },

  directives: {
    clickOutside,
  },
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
