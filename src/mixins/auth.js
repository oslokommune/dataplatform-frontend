import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['login', 'logout', 'refreshUser']),
  },
}
