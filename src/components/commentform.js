/* global axios, API, _ */
import { PRIORITY_LABELS, STATE_LABELS } from '../consts.js'

export default {
  data: () => {
    return {
      content: '',
      saving: false,
      open: false
    }
  },
  props: ['cfg', 'comments'],
  methods: {
    saveComment: async function () {
      const id = this.$router.currentRoute.params.id
      const api = this.$props.cfg.url
      const data = { content: this.$data.content }
      try {
        this.$data.saving = true
        const res = await this.$store.dispatch('send', {
          method: 'post',
          url: `${api}/${id}/comments`,
          data
        })
        this.$props.comments.push(res.data)
        this.$data.content = ''
        this.$data.open = false
      } catch(err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      } finally {
        this.$data.saving = false
      }
    }
  },
  computed: {
    saveDisabled: function () {
      return this.$data.content.length === 0
    },
    canComment: function () {
      return true
      const UID = this.$store.getters.UID
      return UID === this.$data.task.owner || UID === this.$data.task.solver
    }
  },
  template: `
  <div>
    <b-button v-if="canComment" @click="open = true">Komentovat +</b-button>
    <b-modal v-model="open" size="lg" title="Komentovat" hide-footer>
      <form ref="form">
        <b-form-textarea rows="8" id="content-input" v-model="content">
        </b-form-textarea>

        <b-button class="mt-3" block :disabled="saveDisabled" @click="saveComment">
          Odeslat <i v-if="saving" class="fa fa-spinner fa-spin"></i>
        </b-button>
      </form>
    </b-modal>
  </div>
  `
}
