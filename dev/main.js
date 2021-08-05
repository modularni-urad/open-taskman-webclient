/* global Vue, VueMarkdown */
import './vuecustoms.js'
import Store from './store.js'
import List from './modularni-urad-admin-components/entity/list.js'
import Form from './modularni-urad-admin-components/entity/form.js'
import setupRoutes from './index.js'
import DynComponents from './bootstrap-vue-dynamic-form/index.js'
import { 
  WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR 
} from './bootstrap-vue-dynamic-form/components/file.js'

for (let i in DynComponents) {
  Vue.component(i, DynComponents[i])
}
Vue.use(VueMarkdown)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
Vue.component('EntityList', List)
Vue.component('ItemForm', Form)
VeeValidate.extend('required', VeeValidateRules.required)
VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)

const cfg = { 
  url: '/api',
  listViewName: 'ukoly'
}

const router = new VueRouter({
  routes: setupRoutes('/', cfg)
})
const store = Store(router)

new Vue({
  router,
  store,
  template: '<router-view :key="$route.fullPath"></router-view>'
}).$mount('#app')
