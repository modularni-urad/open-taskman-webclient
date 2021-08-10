import { PRIORITY_LABELS, STATE_LABELS } from '../consts.js'

export function priority (value) {
  return PRIORITY_LABELS[value]
}

export function state (value) {
  return STATE_LABELS[value]
}

export const listfilters = [
  { label: 'music', key: 'f1', value: () => ({ tags:{ like: '%music%' } }) },
  { label: '1 month old', key: 'f2', value: () => {
    const now = moment().toISOString()
    const monthAgo = moment().subtract(1, 'month').toISOString()
    return {
      published: { between: [monthAgo, now] }
    }
  }}
]