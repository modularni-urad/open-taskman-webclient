/* global Vue, VueMarkdown */
import './vuecustoms.js'
import Store from './store.js'
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
VeeValidate.extend('required', VeeValidateRules.required)
VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)

async function doInit () {
  const cfg = { 
    url: '/api',
    listViewName: 'ukoly'
  }

  const router = new VueRouter({
    routes: await setupRoutes('/', cfg)
  })
  const store = Store(router)

  new Vue({
    router,
    store,
    template: '<router-view :key="$route.fullPath"></router-view>'
  }).$mount('#app')
}

doInit()