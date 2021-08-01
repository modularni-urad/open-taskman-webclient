import ListComponent from './src/components/list.js'
import DetailComponent from './src/components/detail.js'
import { ROUTE_NAMES as NAMES } from './src/consts.js'

export default function setupTaskmanRoutes (path, cfg) {
  return [{ 
    path, 
    name: NAMES.list, 
    component: ListComponent, 
    props: { cfg }
  }, { 
    path: `${path}:id`, 
    name: NAMES.detail, 
    component: DetailComponent, 
    props: { cfg } 
  }]
}

export const List = ListComponent
export const Detail = DetailComponent
export const ROUTE_NAMES = NAMES