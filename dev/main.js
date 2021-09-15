/* global Vue, VueMarkdown */
import './vuecustoms.js'
import Store from './store.js'
import {setupRoutes} from './index.js'
import ListView from './node_modules/modularni-urad-admin-components/entity/list.js'
import ItemForm from './node_modules/modularni-urad-admin-components/entity/form.js'
import { initConfig } from './node_modules/modularni-urad-admin-components/entity/utils.js'
import DynComponents from './node_modules/bootstrap-vue-dynamic-form/index.js'
import { 
  WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR 
} from './node_modules/bootstrap-vue-dynamic-form/components/file.js'

for (let i in DynComponents) {
  Vue.component(i, DynComponents[i])
}
Vue.use(VueMarkdown)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
Vue.component('ACListView', ListView)
Vue.component('ACDynamicForm', ItemForm)
VeeValidate.extend('required', VeeValidateRules.required)
VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)

async function doInit () {
  const cfg = { 
    url: '/api',
    listViewName: 'ukoly'
  }

  const router = new VueRouter({
    routes: await setupRoutes('/', cfg, initConfig)
  })
  const store = Store(router)

  new Vue({
    router,
    store,
    template: '<router-view :key="$route.fullPath"></router-view>'
  }).$mount('#app')
}

doInit()