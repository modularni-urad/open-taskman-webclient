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
  components: { Actions },
  template: `
  <ACListView :query="query" :cfg="cfg">
    <template v-slot:default="{ items, fields }">

      <tr v-for="row,rowidx in items" :key="rowidx" :class="rowClass(row)">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.due | date }}</td>
        <td>{{ row.prio }}</td>
        <td><NameSpan v-if="row.solver" :uid="row.solver" :cfg="cfg" /></td>
        <td>{{ row.state }}</td>
        <td>{{ row.tags }}</td>
        <Actions key="actions" :query="query" :row="row" :cfg="cfg" />
      </tr>

    </template>
  </ACListView>
  `
}
