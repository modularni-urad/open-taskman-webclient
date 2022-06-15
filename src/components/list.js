import Actions from './actions.js'
import { priority, state } from './filters.js'

const WARN_THRESHOLD = 5 * 24 * 60 * 60 * 1000  // 5 dayss
const prioClasses = {
  'low': null,
  'nor': 'table-success',
  'hi': 'table-warning',
  'cri': 'table-danger'
}
function getDueClass(row) {
  const diff = moment(row.due) - moment()
  return diff < 0 ? 'table-danger' : diff < WARN_THRESHOLD ? 'table-warning' : null
}

export default {
  props: ['query', 'cfg'],
  filters: { priority, state },
  methods: {
    rowClass: function (row) {
      return prioClasses[row.prio] || ''
    },
    dueClass: function (row) {
      return row.due ? getDueClass(row) : null
    }
  },
  components: { Actions },
  template: `
  <ACListView :query="query" :cfg="cfg">
    <template v-slot:tbody="{ items, fields, doEdit }">

      <tr v-for="row,rowidx in items" :key="rowidx">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td :class="dueClass(row)">{{ row.due | date }}</td>
        <td :class="rowClass(row)">{{ row.prio | priority }}</td>
        <td><NameSpan v-if="row.solver" :uid="row.solver" :cfg="cfg" /></td>
        <td>{{ row.state | state }}</td>
        <td>{{ row.tags }}</td>
        <td><Actions key="actions" :doEdit="doEdit" :row="row" :cfg="cfg" /></td>
      </tr>

    </template>
  </ACListView>
  `
}
