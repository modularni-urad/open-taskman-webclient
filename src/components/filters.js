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
      return { 
        not: { state: 'done' },
        solver: self.$store.state.user.id
      }
    }
  }, { 
    label: 'úkoly mého týmu', key: 'f2', value: (self) => { 
      return { 
        not: { state: 'done' },
        or: [
          { manager: self.$store.state.user.id },
          { owner: self.$store.state.user.id }
        ]
      }
    }
  }, { 
    label: 'hotové úkoly', key: 'f3', value: (self) => { 
      return {
        state: 'done',
        or: [
          { manager: self.$store.state.user.id },
          { owner: self.$store.state.user.id }
        ]
      }
    }
  }
]