import { STATE_LABELS, PRIORITY_LABELS } from './consts.js'
export default [{
  name: 'id',
  fieldcomponent: true, sortable: true
}, {
  name: 'name',
  component: "dyn-input",
  label: "název",
  rules: "required",
  fieldcomponent: true, sortable: true
}, {
  name: 'desc',
  component: "dyn-textarea",
  label: "popis",
  rules: "required"
}, {
  name: "due",
  component: "dyn-date",
  label: "Deadline",
  fieldcomponent: 'datestring', sortable: true
}, {
  name: "prio",
  component: "dyn-select",
  options: _.map(PRIORITY_LABELS, (v, k) => ({ value: k, text: v })),
  label: "Priorita",
  rules: "required",
  fieldcomponent: true, sortable: true
}, {
  name: "solver",
  label: "Řešitel",
  fieldcomponent: true
}, {
  name: "state",
  options: _.map(STATE_LABELS, (v, k) => ({ value: k, text: v })),
  label: "Stav",
  fieldcomponent: true, sortable: true
}, {
  name: "tags",
  component: "dyn-input",
  label: "tagy",
  rules: "required",
  fieldcomponent: true
}]