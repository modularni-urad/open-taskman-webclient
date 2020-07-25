
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
      axios.get(`https://api.github.com/search/users?q=${newQuery}`)
        .then((res) => {
          this.users = res.data.items
        })
    }
  },
  props: ['selected'],
  template: `
    <vue-bootstrap-typeahead
      class="mb-4"
      v-model="query"
      :data="users"
      :serializer="item => item.login"
      @hit="select"
      :placeholder="selected || 'vyhledat uživatele ..'"
    />
  `
}
