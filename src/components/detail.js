/* global Vue, axios, API, _ */
import { PRIORITY_LABELS, STATE_LABELS } from './consts.js'
const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      task: null,
      content: ''
    }
  },
  validations: {
    content: { required: validators.required }
  },
  async created () {
    const res = await axios.get(`${API}/taskman/tasks`, {
      params: { filter: { id: this.$props.taskid } }
    })
    this.$data.task = res.data[0]
  },
  props: ['taskid'],
  methods: {
    save () {
      axios.post(`${API}/taskman/tasks`, this.$data)
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
    },
    handleSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.save()
      }
    }
  },
  template: `
      <div class="row">
        <div class="col-sm-6">

          <h3>{{ task.name }} ({{ task.id}})</h3>

          Manažer: {{ task.owner }}<br/>
          Řešitel: {{ task.solver }}<br/>
          Priorita: {{ task.prio }}<br/>
          Stav: {{ task.state }}<br/>
          Termín: {{ task.due | formatDate }}<br/>
          #{{ task.tags }}

          {{ task.desc }}

          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="!$v.content.$error"
              label="Kometář"
              label-for="content-input"
              invalid-feedback="Toto je povinné"
            >
              <b-form-textarea rows="5"
                id="content-input"
                v-model="$v.content.$model"
                :state="!$v.content.$error"
              ></b-form-textarea>
            </b-form-group>

            <b-button class="mt-3" block :disabled="$v.$anyError" @click="handleSubmit">
              Save
            </b-button>
          </form>

        </div>

        <div class="col-sm-6">

        </div>
      </div>

  `
})
