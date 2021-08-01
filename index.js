import ListComponent from './src/components/list.js'

export default function setupTaskmanRoutes (path, cfg) {
  return [
    { path , component: ListComponent, props: { cfg } }
  ]
}

export const List = ListComponent