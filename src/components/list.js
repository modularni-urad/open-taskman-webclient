import formconfig from '../formconfig.js'

const FileActions = {
  props: ['data', 'doEdit'],
  computed: {
    isImage: function () {
      return this.$props.data.item.ctype.indexOf('image') >= 0
    }
  },
  template: `
  <div>
    <b-button size="sm" variant="primary" @click="doEdit(data.item)">
      <i class="fas fa-edit"></i> upravit
    </b-button>
  </div>
  `
}
Vue.component('FileActions', FileActions)

export default {
  // data: function () {
  //   return {
  //     saveHooks: {
  //       prepare: async function (that, data) {
  //         return data.file
  //           ? Object.assign(_.omit(data, 'file'), { 
  //               file: _.pick(data.file, 'type', 'name', 'size')
  //             })
  //           : data
  //       },
  //       finish: async function (that, data, result) {
  //         const content = await loadAsBase64(data.file)
  //         await that.$store.dispatch('send', { 
  //           method: 'post', 
  //           url: `${that.$props.cfg.storage_url}/api/${result.id}/${result.filename}`,
  //           data: { content }
  //         })
  //       }
  //     }
  //   }
  // },
  props: ['cfg'],
  computed: { 
    config: function () {
      return Object.assign({conf: formconfig}, this.$props.cfg)
    }
  },
  template: `
<EntityList :cfg="config" actionsComponent="FileActions" />
  `
}
