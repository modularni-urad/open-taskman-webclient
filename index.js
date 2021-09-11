import ListComponent from './src/components/list.js'
import DetailComponent from './src/components/detail.js'
import { ROUTE_NAMES as NAMES } from './src/consts.js'
import formconfig from './src/formconfig.js'
import { initConfig } from '/modularni-urad-admin-components/entity/utils.js'

export function createMenu (user) {
  return { label: 'úkoly', to: { name: NAMES.list } }
}

export default async function setupTaskmanRoutes (path, cfg) {
  Object.assign(cfg, {conf: formconfig})
  await initConfig(cfg)
  return [{ 
    path, 
    name: NAMES.list, 
    component: ListComponent, 
    props: route => {
      return { query: route.query, cfg }
    }
  }, { 
    path: `${path}:id`, 
    name: NAMES.detail, 
    component: DetailComponent, 
    props: route => {
      return { query: route.query, cfg }
    }
  }]
}

export const List = ListComponent
export const Detail = DetailComponent
export const ROUTE_NAMES = NAMES