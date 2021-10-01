import { PRIORITY_LABELS, STATE_LABELS } from '../consts.js'

export function priority (value) {
  return PRIORITY_LABELS[value]
}

export function state (value) {
  return STATE_LABELS[value]
}

export const listfilters = [
  { 
    label: 'moje úkoly', key: 'f1', value: (self) => { 
      return { solver: self.$store.state.user.id }
    }
  },
  { 
    label: 'úkoly mého týmu', key: 'f2', value: (self) => { 
      return { or: [
        { manager: self.$store.state.user.id },
        { owner: self.$store.state.user.id }
      ]}
    }
  }
]