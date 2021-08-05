import hNew from './handlers/new.js'
import hDelegated from './handlers/delegated.js'
import hInprogress from './handlers/inprogress.js'
import hFinished from './handlers/finished.js'
import hDone from './handlers/done.js'

const handlingComponents = {
  new: 'hNew',
  dlgt: 'hDelegated',
  refd: 'hRefused',
  prog: 'hInprogress',
  fini: 'hFinished',
  done: 'hDone',
  err: 'hDelegated'
}

export default {
  props: ['cfg', 'task', 'UID'],
  computed: {
    c: function () {
      return handlingComponents[this.$props.task.state]
    }
  },
  components: { hNew, hDelegated, hInprogress, hFinished, hDone },
  template: `
  <component :is="c" :cfg="cfg" :task="task" :UID="UID" />
  `
}
