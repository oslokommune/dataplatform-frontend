<template>
  <nav
    class="MobileSideNavDrawer"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="wrapper">
      <FocusTrap>
        <div class="topSection">
          <BaseClickableIcon
            @click.native="$emit('close')"
            aria-label="Close navigation menu"
          >
            <IconX />
          </BaseClickableIcon>
        </div>

        <div class="links">
          <hr />

          <a
            :href="routes.all_datasets.url"
            class="link-and-icon"
            :class="{ 'nav-link-active': isActive('katalog') }"
          >
            {{ routes.all_datasets.title }}
            <IconOpenInNew />
          </a>

          <hr />

          <a v-if="isAuthenticated" id="signOut" href @click.prevent="logout()"
            >Logg ut</a
          >
          <a v-else id="signIn" href @click.prevent="login()">Logg inn</a>
        </div>
      </FocusTrap>
    </div>
  </nav>
</template>

<script>
import FocusTrap from 'vue-focus-lock'
import auth from '@/mixins/auth'
import BaseClickableIcon from '@/components/buttons/BaseClickableIcon'
import IconX from '@/components/icons/IconX'
import routes from '@/modules/header/navigationRoutes'
import IconOpenInNew from '@/components/icons/IconOpenInNew'

export default {
  components: { BaseClickableIcon, IconX, FocusTrap, IconOpenInNew },

  mixins: [auth],

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
.MobileSideNavDrawer {
  height: 100%;
}

.wrapper {
  height: 100%;
  width: 100%;
  background: white;
  border: solid 1px $grey-200;
  border-top: none;
  border-right: none;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);

  .topSection {
    padding-right: calc(3rem - 16px);
    height: $header-height;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .links {
    font-weight: 300;

    a,
    .LinkButton {
      display: block;
      padding: 1em 2em;
      text-decoration: none;

      &:hover {
        background-color: $background-secondary;
      }
    }

    .link-and-icon {
      display: flex;
      align-items: center;

      svg {
        margin-left: 0.5em;
        width: 1.4em;
        height: 1.4em;
      }
    }

    hr {
      border: none;
      border-top: solid 1px $grey-200;
      margin: 1em 1em;
      margin-right: 2em;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
