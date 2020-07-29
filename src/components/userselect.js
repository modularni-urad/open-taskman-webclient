/* global axios, API */

export default {
  data: () => {
    return {
      query: '',
      users: []
    }
  },
  methods: {
    select: function (user) { this.$emit('input', user.id) }
  },
  watch: {
    query (newQuery) {
      axios.get(`${API}/auth/profiles?q=${newQuery}`)
        .then((res) => {
          this.users = res.data
        })
    }
  },
  props: ['selected'],
  template: `
    <vue-bootstrap-typeahead
      class="mb-4"
      v-model="query"
      :data="users"
      :serializer="item => item.name"
      @hit="select"
      :placeholder="selected || 'vyhledat uživatele ..'"
    />
  `
}
