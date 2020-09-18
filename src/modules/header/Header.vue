<template>
  <header class="Header">
    <div class="centered-container">
      <div class="header-contents">
        <div class="left">
          <AppNameLogo />
        </div>
        <div class="right">
          <div class="desktop">
            <a
              :href="routes.all_datasets.url"
              class="link-and-icon"
              :class="{ 'nav-link-active': isActive('katalog') }"
            >
              {{ routes.all_datasets.title }}
              <IconOpenInNew />
            </a>

            <LoginOrProfileLink :active="isActive('profile')" />
          </div>
          <MobileSideNavToggleButton class="mobileOnly" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppNameLogo from '@/modules/header/AppNameLogo'
import MobileSideNavToggleButton from '@/modules/header/mobileSideNav/MobileSideNavToggleButton'
import LoginOrProfileLink from '@/modules/header/LoginOrProfileLink'
import IconOpenInNew from '@/components/icons/IconOpenInNew'
import routes from '@/modules/header/navigationRoutes'

export default {
  components: {
    MobileSideNavToggleButton,
    AppNameLogo,
    LoginOrProfileLink,
    IconOpenInNew,
  },

  data: () => ({
    routes,
  }),

  methods: {
    isActive(name) {
      let root = this.$route.name

      if (root && root.indexOf('-') !== -1) root = root.split('-')[0]

      return root === name
    },
  },
}
</script>

<style lang="scss" scoped>
$headerLinkFontSize: 14px;

.Header {
  flex-shrink: 0;
  color: black;
  background-color: white;
  border-bottom: $separator-border;
}

.header-contents {
  height: $header-height;
  width: 100%;
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .right {
    display: inline-flex;
  }

  .right {
    font-weight: 500;

    .desktop {
      font-size: $headerLinkFontSize;

      // Fits the content in the top bar. Adjust accordingly.
      @include hideOnSmallerThan($lg);
      display: inline-flex;
      align-items: center;

      > * {
        margin-left: 3em;
      }
    }

    .mobileOnly {
      @include hideOnLargerThan($lg + 1px);
      display: flex;
      align-items: center;
    }

    a {
      text-decoration: none;
      white-space: nowrap;

      &.link-and-icon {
        display: flex;
        align-items: center;

        svg {
          margin-left: 0.5em;
          width: 1.4em;
          height: 1.4em;
        }
      }
    }
  }

  &.mobileOnly {
    @include hideOnLargerThan(951px);
  }

  .nav-link-active,
  .nav-link:hover {
    border-bottom: 0.22em solid $ok-yellow;
    margin-bottom: -0.22em;
  }
}
</style>
