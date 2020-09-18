<template>
  <div class="LoginOrProfileLink">
    <div v-if="isAuthenticated" class="avatarNameAndDropdown topbarUserContent">
      <IconUser
        :class="{ dark: $route.path !== '/' && $route.path !== '/login' }"
      />
      <span class="userName nav-link" :class="{ 'nav-link-active': active }">
        {{ user.given_name }}
      </span>
      <UserDropdown />
    </div>
    <template v-else>
      <a
        ref="signIn"
        class="topbarUserContent nav-link"
        href=""
        @click.prevent="login()"
      >
        Logg inn
      </a>
    </template>
  </div>
</template>

<script>
import IconUser from '@/components/icons/IconUser'
import auth from '@/mixins/auth'
import UserDropdown from '@/modules/header/UserDropdown'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    UserDropdown,
    IconUser,
  },
  mixins: [auth],
  props: {
    active: Boolean,
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['refreshUser', 'login', 'logout']),
  },
}
</script>

<style lang="scss" scoped>
.LoginOrProfileLink {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

a {
  color: inherit;
  white-space: nowrap;
  font-weight: 500;
  text-decoration: none;
}

.avatarNameAndDropdown {
  display: flex;
  justify-content: flex-end;
  max-width: 200px;
}

.topbarUserContent {
  display: flex;
  align-items: center;
}

.logOut {
  margin-left: 2em;
}

.IconUser {
  color: $ok-blue-dark;
  height: 35px;
  width: 40px;

  margin-right: 8px;
}

.userName {
  @include textEllipsis;
  max-width: 135px;
}

.dark {
  color: $ok-blue-dark;
}

.signOut {
  margin-left: 1.3em;
}
</style>
