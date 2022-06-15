
export default (router, cfg) => (new Vuex.Store({
  state: {
    user: {},
    router: router,
    cfg
  },
  getters: {
    userLogged: state => {
      return state.user !== null
    },
    UID: state => {
      return state.user.id
    },
    isMember: state => group => {
      try {
        return state.user.groups.indexOf(group) >= 0
      } catch (_) {
        return false
      }
    }
  },
  mutations: {
    profile: (state, profile) => {
      state.user = profile
    }
  },
  actions: {
    onerror: function (ctx, err) {
      console.error(err)
    },
    login: function (ctx, credentials) {
      const url = 'https://dev.modurad.otevrenamesta.cz/omstredni/auth/login/omesta?token=1'
      return axios.post(url, credentials).then(res => {
        this.commit('profile', res.data)
      }).catch(err => this.dispatch('onerror', err))
    },
    send: function (ctx, opts) {
      Object.assign(opts, {
        headers: { 'Authorization': `Bearer ${this.state.user.token}` }
      })
      return axios(opts)
    }
  }
}))
