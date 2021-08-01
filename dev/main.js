/* global Vue, VueMarkdown */
import './vuecustoms.js'
import store from './store.js'
import List from './modularni-urad-adminwebapp/src/components/entity/list.js'
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
VeeValidate.extend('required', VeeValidateRules.required)
VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)

const cfg = { 
  url: '/api',
  listViewName: 'ukoly'
}

const router = new VueRouter({
  routes: setupRoutes('/', cfg)
})

new Vue({
  router,
  store,
  template: '<router-view :key="$route.fullPath"></router-view>'
}).$mount('#app')
