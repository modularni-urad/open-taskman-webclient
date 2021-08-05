export default {
  props: ['cfg', 'task', 'UID'],
  computed: {
    forMe: function () {
      const { task, UID } = this.$props
      return _.last(task.solvers) === UID
    }
  },
  methods: {
    onSubmit: async function (data) {
      const taskid = this.$props.task.id
      const api = this.$props.cfg.url
      try {
        const res = await this.$store.dispatch('send', {
          method: 'post',
          url: `${api}/${taskid}/delegation/${data.user}`
        })
        this.$data.open = false
      } catch(err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
        throw err
      }
    },
    accept: async function () {
    }
  },
  template: `
    <span v-if="forMe">
      <b-button @click="accept">akceptovat</b-button>
      <b-button @click="open = true">odmítnout</b-button>
    </span>
  `
}
