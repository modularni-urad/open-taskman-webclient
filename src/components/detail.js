/* global axios, API */
import { PRIORITY_LABELS, STATE_LABELS } from './consts.js'

export default {
  data: () => {
    return {
      loading: true,
      task: null,
      comments: [],
      content: ''
    }
  },
  filters: {
    priority: (value) => PRIORITY_LABELS[value],
    state: (value) => STATE_LABELS[value]
  },
  async created () {
    const id = this.$props.taskid
    const res = await Promise.all([
      axios.get(`${API}/taskman/tasks/`, { params: { filter: { id } } }),
      axios.get(`${API}/taskman/tasks/${this.$props.taskid}/comments`)
    ])
    this.$data.task = res[0].data[0]
    this.$data.comments = res[1].data
    this.$data.loading = false
  },
  props: ['taskid'],
  methods: {
    save () {
      const id = this.$props.taskid
      const data = { content: this.$data.content }
      axios.post(`${API}/taskman/tasks/${id}/comments`, data)
        .then(res => {
          this.$data.comments.push(res.data)
          this.$data.content = ''
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  computed: {
    saveDisabled: function () {
      return this.$data.content.length === 0
    }
  },
  template: `
    <div>
      <i v-if="loading" class="fa fa-spinner fa-spin"></i>
      <div class="row" v-else>
        <div class="col-sm-6 col-md-4">

          <h3>{{ task.name }} ({{ task.id}})</h3>

          Manažer: {{ task.owner }}<br/>
          Řešitel: {{ task.solver }}<br/>
          Priorita: {{ task.prio | priority }}<br/>
          Stav: {{ task.state | state }}<br/>
          Termín: {{ task.due | formatDate }}<br/>
          #{{ task.tags }}

          {{ task.desc }}
        </div>

        <div class="col-sm-6 col-md-8">
          <div v-for="c in comments">
            <div><b>{{ c.author }}</b> <i>{{ c.created | longDate }}</i>:</div>
            <vue-markdown>{{ c.content }}</vue-markdown>
          </div>
          <hr/>
          <form ref="form">
            <b-form-textarea rows="3" id="content-input" v-model="content">
            </b-form-textarea>

            <b-button class="mt-3" block :disabled="saveDisabled" @click="save">
              Odeslat
            </b-button>
          </form>
        </div>
      </div>
    </div>
  `
}
