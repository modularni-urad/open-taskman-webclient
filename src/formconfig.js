import { STATE_LABELS } from './consts.js'
export default [
  {
    name: 'name',
    component: "dyn-input",
    label: "název",
    rules: "required",
    fieldcomponent: true
  },
  {
    name: 'desc',
    component: "dyn-textarea",
    label: "popis",
    rules: "required",
    fieldcomponent: false
  },
  {
    name: "tags",
    component: "dyn-input",
    label: "tagy",
    rules: "required",
    fieldcomponent: true
  },
  // {
  //   name: "owner",
  //   component: "dyn-input",
  //   label: "Manažer"
  // },
  {
    name: "state",
    component: "dyn-select",
    options: _.map(STATE_LABELS, (v, k) => ({ value: k, text: v })),
    label: "Stav",
    fieldcomponent: true//"datestring"
  }
]