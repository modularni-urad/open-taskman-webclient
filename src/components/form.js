/* global Vue, axios, API, _, moment */
import { PRIORITY_LABELS, STATE_LABELS } from './consts.js'
import UserSelect from './userselect.js'
const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      name: '',
      desc: '',
      tags: '',
      owner: '',
      solver: '',
      state: 'new',
      prio: 'nor',
      due: ''
    }
  },
  computed: {
    prioOpts: () => _.map(PRIORITY_LABELS, (v, k) => ({ value: k, text: v })),
    stateOpts: () => _.map(STATE_LABELS, (v, k) => ({ value: k, text: v }))
  },
  validations: {
    name: { required: validators.required },
    desc: { required: validators.required },
    tags: { required: validators.required },
    owner: { required: validators.required },
    solver: {},
    state: { required: validators.required },
    prio: { required: validators.required },
    due: { required: validators.required }
  },
  created () {
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
      this.$data.due = moment(this.$data.due).format('YYYY-MM-DD')
    }
  },
  props: ['item'],
  methods: {
    save () {
      return this.$data.id
        ? axios.put(`${API}/taskman/tasks/${this.$data.id}`, this.$data)
        : axios.post(`${API}/taskman/tasks`, this.$data)
    },
    handleSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      this.save()
        .then(res => {
          this.$attrs.onSubmit(this.$data)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-add')
          })
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  components: {
    'user-select': UserSelect
  },
  template: `
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <div class="row">
        <div class="col-sm-6">
          <b-form-group
            :state="!$v.name.$error"
            label="Název"
            label-for="name-input"
            invalid-feedback="Název je povinný"
          >
            <b-form-input
              id="name-input"
              v-model="$v.name.$model"
              :state="!$v.name.$error"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="!$v.tags.$error"
            label="Tagy"
            label-for="tags-input"
            invalid-feedback="Toto je povinné"
          >
            <b-form-tags input-id="tags-basic"
              v-model="$v.tags.$model" class="mb-2" :state="!$v.tags.$error">
            </b-form-tags>
          </b-form-group>
        </div>

        <div class="col-sm-6">

          <div class="row">
            <div class="col-sm-6">
              <b-form-group
                :state="!$v.owner.$error"
                label="Manažer"
                label-for="owner-input"
                invalid-feedback="Toto je povinné"
              >
                <b-form-input
                  id="owner-input"
                  v-model="$v.owner.$model"
                  :state="!$v.owner.$error"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group
                :state="!$v.solver.$error"
                label="Řešitel"
                label-for="solver-input"
                invalid-feedback="Toto je povinné"
              >
                <user-select id="solver-input"
                  :state="!$v.solver.$error"
                  v-model="$v.solver.$model">
                </user-select>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4">
              <b-form-group
                :state="!$v.due.$error"
                label="Termín"
                label-for="due-input"
                invalid-feedback="Toto je povinné"
              >
                <b-form-input
                  id="due-input"
                  type="date"
                  v-model="$v.due.$model"
                  :state="!$v.due.$error"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-4">
              <b-form-group
                :state="!$v.state.$error"
                label="Stav"
                label-for="state-input"
                invalid-feedback="Toto je povinné"
              >
                <b-form-select id="state-input" v-model="$v.state.$model"
                  :state="!$v.state.$error" :options="stateOpts">
                </b-form-select>
              </b-form-group>
            </div>
            <div class="col-sm-4">
              <b-form-group
                :state="!$v.prio.$error"
                label="Priorita"
                label-for="prio-input"
                invalid-feedback="Toto je povinné"
              >
                <b-form-select id="prio-input" v-model="$v.prio.$model"
                  :state="!$v.prio.$error" :options="prioOpts">
                </b-form-select>
              </b-form-group>
            </div>
          </div>

        </div>
      </div>

      <b-form-group
        :state="!$v.desc.$error"
        label="Popis"
        label-for="desc-input"
        invalid-feedback="Toto je povinné"
      >
        <b-form-textarea rows="5"
          id="desc-input"
          v-model="$v.desc.$model"
          :state="!$v.desc.$error"
        ></b-form-textarea>
      </b-form-group>

      <b-button class="mt-3" block :disabled="$v.$anyError" @click="handleSubmit">
        Save
      </b-button>
    </form>
  `
})
