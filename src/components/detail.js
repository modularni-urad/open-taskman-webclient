/* global axios, API, _ */
import { PRIORITY_LABELS, STATE_LABELS } from '../consts.js'
import CommentForm from './commentform.js'

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
    const api = this.$props.cfg.url
    const taskid = this.$router.currentRoute.query.detail
    const res = await Promise.all([
      axios.get(api, { params: { filter: JSON.stringify({ id: taskid }) } }),
      axios.get(`${api}/${taskid}/comments`)
    ])
    this.$data.task = res[0].data[0]
    this.$data.comments = res[1].data
    const uids = _.uniq(_.union(
      _.map(res[1].data, i => i.author),
      [this.$data.task.owner, this.$data.task.solver]
    ))
    await this.$store.dispatch('loadusers', uids)
    this.$data.loading = false
  },
  props: ['cfg'],
  methods: {

  },
  components: { CommentForm },
  template: `
    <div>
      <i v-if="loading" class="fa fa-spinner fa-spin"></i>
      <div class="row" v-else>
        <div class="col-sm-6 col-md-4">

          <h3>#{{ task.id}}: {{ task.name }}</h3>

          Manažer: {{ task.owner | username }}<br/>
          Řešitel: {{ task.solver | username }}<br/>
          Priorita: {{ task.prio | priority }}<br/>
          Stav: {{ task.state | state }}<br/>
          Termín: {{ task.due | formatDate }}<br/>
          <span v-for="i in task.tags">#{{ i }}</span>, {{ task.created | formatDate }}
          <hr/>
          <p><vue-markdown>{{ task.desc }}</vue-markdown></p>
        </div>

        <div class="col-sm-6 col-md-8">
          <div style="height: 30em; overflow: overlay;">
            <div v-for="c in comments">
              <div><b>{{ c.author | username }}</b> <i>{{ c.created | longDate }}</i>:</div>
              <vue-markdown>{{ c.content }}</vue-markdown>
            </div>
          </div>
          
          <CommentForm :cfg="cfg" :comments="comments" />
        </div>
      </div>
    </div>
  `
}
