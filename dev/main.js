/* global Vue, VueMarkdown */
import './vuecustoms.js'
import store from './store.js'
import List from './modularni-urad-adminwebapp/src/components/entity/list.js'
import C from './index.js'
import DynComponents from './bootstrap-vue-dynamic-form/index.js'

for (let i in DynComponents) {
  Vue.component(i, DynComponents[i])
}
Vue.use(VueMarkdown)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
Vue.component('EntityList', List)
VeeValidate.extend('required', VeeValidateRules.required)

new Vue({
  store,
  components: { mycomponent: C.List },
  template: `
  <mycomponent :cfg="{url: '/api/tasks'}" />
  `
}).$mount('#app')
