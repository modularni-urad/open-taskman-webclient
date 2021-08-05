import { PRIORITY_LABELS } from '../../consts.js'
export const DELEGATION = [
  {
    name: 'user',
    component: "dyn-input",
    label: "řešitel",
    rules: "required"
  },
  
]

export const DELEGATION_REFUSE = [
  {
    name: 'message',
    component: "dyn-textarea",
    label: "Důvod",
    rules: "required"
  }
]