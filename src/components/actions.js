import { ROUTE_NAMES } from '../consts.js'

export default {
  props: ['query', 'cfg', 'row', 'doEdit'],
  computed: {
    muzuUpravit: function () {
      return this.row.state !== 'done'
        && this.row.owner === this.$store.getters.UID.toString()
    }
  },
  methods: {
    showDetail: function (i) {
      this.$router.push({ name: ROUTE_NAMES.detail, params: { id: i.id } })
    }
  },
  template: `
    <b-button-group>
      <b-button v-if="muzuUpravit" size="sm" variant="primary" @click="doEdit(row)">
        <i class="fas fa-edit"></i> upravit
      </b-button>
      <b-button size="sm" variant="secondary" @click="showDetail(row)">
        <i class="fas fa-edit"></i> detail
      </b-button>
    </b-button-group>
  `
}
