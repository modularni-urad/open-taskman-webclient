/* global Vue, Vuex, localStorage, API, axios, _ */

const KEY = '_opencomm_user_'
const savedUser = localStorage.getItem(KEY)
const loadedUsers = {}

Vue.filter('username', function (uid) {
  return loadedUsers[uid] || 'unknown'
})

export default new Vuex.Store({
  state: {
    user: savedUser && JSON.parse(savedUser)
  },
  getters: {
    userLogged: state => {
      return state.user !== null
    },
    UID: state => (state.user.id),
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
      localStorage.setItem(KEY, JSON.stringify(profile))
      state.user = profile
    }
  },
  actions: {
    toast: function (ctx, opts) {
      Vue.$toast.open(opts)
    },
    send: function (ctx, opts) {
      this.state.user.token && Object.assign(opts, {  // for debug only
        headers: { 'Authorization': `Bearer ${this.state.user.token}`}
      })
      return axios(opts)
    },
    loadusers: function (ctx, opts) {
      const toBeLoaded = _.filter(opts, i => !(i in loadedUsers))
      return new Promise(resolve => {
        toBeLoaded.length === 0 ? resolve() : setTimeout(() => {
          console.log(`loaded: ${JSON.stringify(toBeLoaded)}`)
          _.each(toBeLoaded, uid => {
            loadedUsers[uid] = 'jssjfls' + uid
          })
          resolve()
        }, 300)
      })
    }
  }
})
