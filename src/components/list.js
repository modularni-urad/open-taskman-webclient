import formconfig from '../formconfig.js'
import Detail from './detail.js'

const FileActions = {
  props: ['data', 'doEdit'],
  computed: {
    
  },
  methods: {
    showDetail: function (i) {
      this.$router.push({ query: { detail: i.id } })
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
  components: { Detail },
  template: `
<div>
  <EntityList :cfg="config" actionsComponent="TaskmanFileActions" />
  <b-modal v-model="currDetail" size="xl" title="Detail" hide-footer hide-header>
    <Detail :cfg="cfg" />
  </b-modal>
</div>
  `
}
