import { setState } from '../utils.js'

export default {
  props: ['cfg', 'task', 'UID'],
  computed: {
    forMe: function () {
      const { task, UID } = this.$props
      return task.manager === UID
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
      return setState(this.$store, 'done', this.$props)
    }
  },
  template: `
    <span v-if="forMe">
      <b-button @click="accept">akceptovat</b-button>
      <b-button @click="open = true">odmítnout</b-button>
    </span>
  `
}