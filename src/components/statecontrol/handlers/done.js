export default {
  props: ['cfg', 'task', 'UID'],
  computed: {
    forMe: function () {
      const { task, UID } = this.$props
      const solvers = task.solvers ? task.solvers.split(',') : []
      return _.last(solvers) === UID.toString()
    }
  },
  methods: {
    onSubmit: async function (data) {
      const taskid = this.$props.task.id
      const api = this.$props.cfg.url
      try {
        const res = await this.$store.dispatch('send', {
          method: 'post',
          url: `${api}${taskid}/delegation/${data.user}`
        })
        this.$emit('statechange', res.data)
        this.$store.dispatch('toast', { message: 'status změněn' })
        this.$data.open = false
      } catch(err) {
        this.$store.dispatch('onerror', err)
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
