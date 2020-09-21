import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['loadingUser', 'user']),
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['login', 'logout', 'refreshUser']),
  },
}
