import ListView from '/modularni-urad-admin-components/entity/list.js'
import { cellData } from '/modularni-urad-admin-components/entity/utils.js'
import { ROUTE_NAMES } from '../consts.js'

const prioClasses = {
  'low': null,
  'nor': 'table-success',
  'hi': 'table-warning',
  'cri': 'table-danger'
}

export default {
  props: ['query', 'cfg'],
  methods: {
    doEdit: function (row) {
      const query = Object.assign({}, this.query, { _detail: row.id })
      this.$router.replace({ query })
    },
    rowClass: function (row) {
      return prioClasses[row.prio] || ''
    },
    showDetail: function (i) {
      this.$router.push({ name: ROUTE_NAMES.detail, params: { id: i.id } })
    },
    cellData
  },
  components: { ListView },
  template: `
  <ListView :query="query" :cfg="cfg">
    <template v-slot:default="{ items, fields }">
      <tr v-for="row,rowidx in items" :key="rowidx" :class="rowClass(row)">
        <td v-for="field,idx in fields" :key="idx">
          {{ cellData(row, field) }}
        </td>
        <td key="actions">
          <b-button size="sm" variant="primary" @click="doEdit(row)">
            <i class="fas fa-edit"></i> upravit
          </b-button>
          <b-button size="sm" variant="secondary" @click="showDetail(row)">
            <i class="fas fa-edit"></i> detail
          </b-button>
        </td>
      </tr>
    </template>
  </ListView>
  `
}
