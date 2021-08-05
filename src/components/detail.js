/* global axios, API, _ */
import { PRIORITY_LABELS, STATE_LABELS, ROUTE_NAMES } from '../consts.js'
import CommentForm from './commentform.js'
import StateControl from './statecontrol/index.js'

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
    const taskid = this.$router.currentRoute.params.id
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
  computed: {
    backUrl: function () {
      return { name: ROUTE_NAMES.list }
    },
    solvers: function () {
      return this.$data.task.solvers
    },
    manager: function () {
      return this.$data.task.solvers
        ? _.last(this.$data.task.solvers)
        : this.$data.task.owner
    }
  },
  methods: {

  },
  components: { CommentForm, StateControl },
  template: `
    <div>
      <b-breadcrumb>
        <b-breadcrumb-item to="/"><i class="fas fa-home"></i></b-breadcrumb-item>
        <b-breadcrumb-item :to="backUrl">{{ cfg.listViewName || 'tasks' }}</b-breadcrumb-item>
        <b-breadcrumb-item active>
          <i v-if="loading" class="fa fa-spinner fa-spin"></i>
          <span v-else>{{ task.name }}</span>
        </b-breadcrumb-item>
      </b-breadcrumb>
      
      <div class="row" v-if="!loading">
        <div class="col-sm-6 col-md-4">
          Manažer: {{ task.manager | username }}<br/>
          Resitel: {{ task.solver | username }}<br/>
          Priorita: {{ task.prio }}<br/>
          Termín: {{ task.due | date }}<br/>
          Stav: {{ task.state }} <StateControl :cfg="cfg" :task="task" :UID="$store.getters.UID" /><br/>
          <span>{{ task.tags }}</span>, {{ task.created | datetime }}
          <p><vue-markdown>{{ task.desc }}</vue-markdown></p>
        </div>

        <div class="col-sm-6 col-md-8">
          <div style="height: 30em; overflow: overlay;">
            <div v-for="c in comments">
              <div><b>{{ c.author | username }}</b> <i>{{ c.created | datetime }}</i>:</div>
              <vue-markdown>{{ c.content }}</vue-markdown>
            </div>
          </div>
          
          <CommentForm :cfg="cfg" :comments="comments" />
        </div>
      </div>
    </div>
  `
}
