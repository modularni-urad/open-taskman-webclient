import formconfig from '../formconfig.js'
import { ROUTE_NAMES } from '../consts.js'

const FileActions = {
  props: ['data', 'doEdit'],
  computed: {
    
  },
  methods: {
    showDetail: function (i) {
      this.$router.push({ name: ROUTE_NAMES.detail, params: { id: i.id } })
    }
  },
  template: `
  <div>
    <b-button size="sm" variant="primary" @click="doEdit(data.item)">
      <i class="fas fa-edit"></i> upravit
    </b-button>
    <b-button size="sm" variant="secondary" @click="showDetail(data.item)">
      <i class="fas fa-edit"></i> detail
    </b-button>
  </div>
  `
}
Vue.component('TaskmanFileActions', FileActions)

export default {
  data: () => {
    return {
      currDetail: null
    }
  },
  props: ['cfg'],
  created () {
    this.$data.currDetail = this.$router.currentRoute.query.detail !== undefined
  },
  computed: { 
    config: function () {
      return Object.assign({conf: formconfig}, this.$props.cfg)
    }
  },
  template: `
  <EntityList :cfg="config" actionsComponent="TaskmanFileActions" />
  `
}
