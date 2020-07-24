/* global Vue */
import './vuecustoms.js'
import store from './store.js'
import C from './components/list.js'

new Vue({
  store,
  components: { mycomponent: C },
  template: `
  <mycomponent></mycomponent>
  `
}).$mount('#app')
