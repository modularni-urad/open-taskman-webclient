/* global axios, API, _ */
import { ROUTE_NAMES } from '../consts.js'
import CommentForm from './commentform.js'
import StateControl from './statecontrol/index.js'
import { priority, state } from './filters.js'

export default {
  data: () => {
    return {
      loading: true,
      task: null,
      comments: [],
      content: ''
    }
  },
  filters: { priority, state },
  async created () {
    const api = this.$props.cfg.url
    const taskid = this.$router.currentRoute.params.id
    const res = await Promise.all([
      axios.get(`${api}${taskid}`),
      axios.get(`${api}${taskid}/comments?sort=created:desc`)
    ])
    this.$data.task = res[0].data
    this.$data.comments = res[1].data
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
    onStateChange: function (update) {
      Object.assign(this.task, update[0])
    }
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
          Manažer: <NameSpan v-if="task.manager" :uid="task.manager" :cfg="cfg" /><br/>
          Resitel: <NameSpan v-if="task.solver" :uid="task.solver" :cfg="cfg" /><br/>
          Priorita: {{ task.prio | priority }}<br/>
          Termín: {{ task.due | date }}<br/>
          Stav: {{ task.state | state }} <StateControl 
            :cfg="cfg" :task="task" :UID="$store.getters.UID" 
            @statechange="onStateChange" /><br/>
          <span>{{ task.tags }}</span>, {{ task.created | datetime }}
          <p><vue-markdown>{{ task.desc }}</vue-markdown></p>
        </div>

        <div class="col-sm-6 col-md-8">
          <div style="height: 30em; overflow: overlay;">
            <div v-for="c in comments">
              <div><b><NameSpan :uid="c.author" :cfg="cfg" /></b> <i>{{ c.created | datetime }}</i>:</div>
              <vue-markdown>{{ c.content }}</vue-markdown>
            </div>
          </div>
          
          <CommentForm v-if="$store.getters.userLogged" :cfg="cfg" :comments="comments" />
        </div>
      </div>
    </div>
  `
}
