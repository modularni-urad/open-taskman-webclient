/* global Vue, VueMarkdown */
import './vuecustoms.js'
import store from './store.js'
import C from './index.js'

Vue.use(VueMarkdown)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

new Vue({
  store,
  components: { mycomponent: C.List },
  template: `
  <mycomponent :cfg="{api: '/api'}" />
  `
}).$mount('#app')
