import { DELEGATION_REFUSE} from '../formconfigs.js'
import { setState } from '../utils.js'

export default {
  data: () => {
    return {
      formconfig: DELEGATION_REFUSE,
      open: false
    }
  },
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
          method: 'put',
          url: `${api}${taskid}/state/refd`,
          data
        })
        this.$emit('statechange', res.data)
        this.$store.dispatch('toast', { message: 'status změněn' })
        this.$data.open = false
      } catch(err) {
        this.$store.dispatch('onerror', err)
      }
    },
    accept: async function () {
      return setState(this, 'prog')
    }
  },
  template: `
    <span v-if="forMe">
      <b-button @click="accept">akceptovat</b-button>
      <b-button @click="open = true">odmítnout</b-button>
      <b-modal v-model="open" size="lg" title="odmítnout úkol" hide-footer>
        <ACDynamicForm :config="formconfig" :onSubmit="onSubmit" />
      </b-modal>
    </span>
  `
}
