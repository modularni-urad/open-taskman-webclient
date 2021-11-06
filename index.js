import ListComponent from './src/components/list.js'
import DetailComponent from './src/components/detail.js'
import { ROUTE_NAMES as NAMES } from './src/consts.js'
import formconfig from './src/formconfig.js'
import { listfilters } from './src/components/filters.js'

export function createMenu (user) {
  return { label: 'úkoly', to: { name: NAMES.list } }
}

export async function setupRoutes (routes, path, cfg, initConfig) {
  Object.assign(cfg, { conf: formconfig, filters: listfilters })
  await initConfig(cfg)
  routes.push({ 
    path, 
    name: NAMES.list, 
    component: ListComponent, 
    props: route => {
      return { query: route.query, cfg }
    }
  })
  routes.push({ 
    path: `${path}:id`, 
    name: NAMES.detail, 
    component: DetailComponent, 
    props: route => {
      return { query: route.query, cfg }
    }
  })
}

export const List = ListComponent
export const Detail = DetailComponent
export const ROUTE_NAMES = NAMES