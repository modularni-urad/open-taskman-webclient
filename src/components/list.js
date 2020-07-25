/* global axios, API, _ */
import ItemForm from './form.js'
import Detail from './detail.js'
import { PRIORITY_LABELS, STATE_LABELS } from './consts.js'

export default {
  data: () => {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Název', sortable: true },
        { key: 'tags', label: 'Tagy' },
        { key: 'owner', label: 'Manažer' },
        { key: 'solver', label: 'Řešitel' },
        { key: 'due', label: 'Termín', sortable: true },
        { key: 'state', label: 'Stav', sortable: true },
        { key: 'prio', label: 'Priorita', sortable: true },
        { key: 'actions', label: '' }
      ],
      items: [],
      isBusy: false,
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      curr: null,
      currDetail: null,
      item: {}
    }
  },
  filters: {
    priority: (value) => PRIORITY_LABELS[value],
    state: (value) => STATE_LABELS[value]
  },
  methods: {
    myProvider (ctx) {
      const params = {
        currentPage: this.currentPage,
        perPage: this.perPage,
        sort: ctx.sortBy ? `${ctx.sortBy}:${ctx.sortDesc ? 'desc' : 'asc'}` : 'id:asc'
      }
      let data = null
      const promise = axios.get(`${API}/taskman/tasks`, { params })
      return promise.then(res => {
        this.totalRows = res.data.pagination.total
          ? res.data.pagination.total : this.totalRows
        data = res.data.data
        const uids = _.uniq(
          _.union(_.map(data, i => i.solver), _.map(data, i => i.owner))
        )
        return this.$store.dispatch('loadusers', uids)
      }).then(res => {
        return data
      }).catch(err => {
        console.log(err)
        return []
      })
    },
    setPageSize: function (newSize) {
      this.perPage = newSize
    },
    detail: function (item) {
      this.$data.currDetail = item.id
      this.$bvModal.show('modal-detail')
    },
    add: function () {
      this.$data.curr = null
      this.$bvModal.show('modal-add')
    },
    edit: function (item) {
      this.$data.curr = item
      this.$bvModal.show('modal-add')
    },
    onItemSubmit: function (item) {
      if (this.curr) {
        Object.assign(this.curr, item)
      }
    }
  },
  components: {
    'item-form': ItemForm,
    detail: Detail
  },
  template: `
  <div>
    <div>
      <b-breadcrumb class="float-left">
        <b-breadcrumb-item to="/"><i class="fas fa-home"></i></b-breadcrumb-item>
        <b-breadcrumb-item active>Úkoly</b-breadcrumb-item>
      </b-breadcrumb>

      <div class="float-right">
        <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="add">
          <i class="fas fa-plus"></i> Přidat
        </b-button>
      </div>

      <b-table small striped hover sort-icon-left no-local-sorting
        id="maps-table"
        primary-key="id"
        :current-page="currentPage"
        :per-page="perPage"
        :busy.sync="isBusy"
        :items="myProvider"
        :fields="fields"
      >
        <template v-slot:cell(due)="data">
          {{ data.item.due | formatDate }}
        </template>
        <template v-slot:cell(owner)="data">
          {{ data.item.owner | username }}
        </template>
        <template v-slot:cell(solver)="data">
          {{ data.item.solver | username }}
        </template>
        <template v-slot:cell(prio)="data">
          {{ data.item.prio | priority }}
        </template>
        <template v-slot:cell(state)="data">
          {{ data.item.state | state }}
        </template>
        <template v-slot:cell(tags)="data">
          <span v-if="data.item.tags" v-for="i in data.item.tags"> #{{ i }}</span>
        </template>
        <template v-slot:cell(name)="data">
          <a href="javascript:void(0)" v-on:click="detail(data.item)">
            {{ data.item.name }}
          </a>
        </template>
        <template v-slot:cell(actions)="data">
          <b-button v-if="$store.getters.UID === data.item.owner"
            size="sm" variant="primary"
            v-on:click="edit(data.item)">
            <i class="fas fa-edit"></i> upravit
          </b-button>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="maps-table"
      ></b-pagination>

      <b-dropdown id="pagesize-dropup" dropup text="Velikost stránky"
        variant="primary" class="m-2">
        <b-dropdown-item @click="setPageSize(5)">5</b-dropdown-item>
        <b-dropdown-item @click="setPageSize(10)">10</b-dropdown-item>
        <b-dropdown-item @click="setPageSize(50)">50</b-dropdown-item>
      </b-dropdown>

      <b-modal size="xl" id="modal-add" title="Upravit" hide-footer>
        <item-form v-bind:onSubmit="onItemSubmit" v-bind:item="curr">
        </item-form>
      </b-modal>

      <b-modal size="xl" id="modal-detail" title="Detail" hide-footer hide-header>
        <detail v-bind:taskid="currDetail"></detail>
      </b-modal>
    </div>
  </div>
  `
}
