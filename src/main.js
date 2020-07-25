/* global Vue, VueMarkdown */
import './vuecustoms.js'
import store from './store.js'
import C from './components/list.js'

Vue.use(VueMarkdown)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

new Vue({
  store,
  components: { mycomponent: C },
  template: `
  <mycomponent></mycomponent>
  `
}).$mount('#app')
