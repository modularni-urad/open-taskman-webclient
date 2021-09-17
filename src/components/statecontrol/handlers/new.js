import { DELEGATION} from '../formconfigs.js'

export default {
  data: () => {
    return {
      formconfig: DELEGATION,
      open: false
    }
  },
  props: ['cfg', 'task', 'UID'],
  computed: {
    forMe: function () {
      const { task, UID } = this.$props
      return task.owner.toString() === UID.toString()
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
        this.$store.dispatch('onerror', err)
        throw err
      }
    }
  },
  template: `
    <span v-if="forMe">
      <b-button @click="open = true">delegovat</b-button>
      <b-modal v-model="open" size="lg" title="delegovat" hide-footer>
        <ACDynamicForm :config="formconfig" :onSubmit="onSubmit" />
      </b-modal>
    </span>
  `
}
