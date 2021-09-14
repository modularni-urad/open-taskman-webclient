import ListView from '/modularni-urad-admin-components/entity/list.js'
import Actions from './actions.js'

const prioClasses = {
  'low': null,
  'nor': 'table-success',
  'hi': 'table-warning',
  'cri': 'table-danger'
}

export default {
  props: ['query', 'cfg'],
  methods: {
    rowClass: function (row) {
      return prioClasses[row.prio] || ''
    }
  },
  components: { ListView, Actions },
  template: `
  <ListView :query="query" :cfg="cfg">
    <template v-slot:default="{ items, fields }">

      <tr v-for="row,rowidx in items" :key="rowidx" :class="rowClass(row)">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.due | date }}</td>
        <td>{{ row.prio }}</td>
        <td><NameSpan :uid="row.solver" :cfg="cfg" /></td>
        <td>{{ row.state }}</td>
        <td>{{ row.tags }}</td>
        <Actions key="actions" :query="query" :row="row" :cfg="cfg" />
      </tr>

    </template>
  </ListView>
  `
}
