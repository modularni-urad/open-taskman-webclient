import { PRIORITY_LABELS, STATE_LABELS } from '../consts.js'

export function priority (value) {
  return PRIORITY_LABELS[value]
}

export function state (value) {
  return STATE_LABELS[value]
}