/* global Vue, Vuex, localStorage, API, axios */

const KEY = '_opencomm_user_'
const savedUser = localStorage.getItem(KEY)

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
    login: function (ctx, opts) {
      return axios.post(`${API}/auth/login`, opts, {
        withCredentials: false
      }).then(res => {
        this.commit('profile', res.data)
        return res.data
      })
    },
    logout: async function (ctx, opts) {
      await axios.post(`${API}/auth/logout`)
      localStorage.removeItem(KEY)
      this.commit('profile', null)
    },
    init: async function (ctx, opts) {
      try {
        const res = await axios.get(`${API}/profile`)
        this.commit('profile', res.data.user)
      } catch (_) {}
    },
    handleError: function (ctx, opts) {
    }
  }
})
