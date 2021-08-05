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
      return _.last(task.solvers) === UID
    }
  },
  methods: {
    onSubmit: async function (data) {
      const taskid = this.$props.task.id
      const api = this.$props.cfg.url
      try {
        const res = await this.$store.dispatch('send', {
          method: 'put',
          url: `${api}/${taskid}/state/refd`,
          data
        })
        this.$data.open = false
      } catch(err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
        throw err
      }
    },
    accept: async function () {
      return setState(this.$store, 'prog', this.$props)
    }
  },
  template: `
    <span v-if="forMe">
      <b-button @click="accept">akceptovat</b-button>
      <b-button @click="open = true">odmítnout</b-button>
      <b-modal v-model="open" size="lg" title="Odmítnout úkol" hide-footer>
        <ItemForm :config="formconfig" :onSubmit="onSubmit" />
      </b-modal>
    </span>
  `
}
