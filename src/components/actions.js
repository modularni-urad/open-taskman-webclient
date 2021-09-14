import { ROUTE_NAMES } from '../consts.js'

export default {
  props: ['query', 'cfg', 'row'],
  computed: {
    muzuUpravit: function () {
      return this.row.stav === 'draft' 
        && this.row.predkl === this.$store.getters.UID.toString()
    }
  },
  methods: {
    doEdit: function () {
      const query = Object.assign({}, this.query, { _detail: this.row.id })
      this.$router.replace({ query })
    },
    showDetail: function (i) {
      this.$router.push({ name: ROUTE_NAMES.detail, params: { id: i.id } })
    }
  },
  template: `
  <td>
    <b-button-group>
      <b-button size="sm" variant="primary" @click="doEdit(row)">
        <i class="fas fa-edit"></i> upravit
      </b-button>
      <b-button size="sm" variant="secondary" @click="showDetail(row)">
        <i class="fas fa-edit"></i> detail
      </b-button>
    </b-button-group>
  </td>
  `
}
