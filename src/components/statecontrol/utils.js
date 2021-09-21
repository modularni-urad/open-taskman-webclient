export async function setState (vm, state) {
  const taskid = vm.$props.task.id
  const api = vm.$props.cfg.url
  try {
    const res = await vm.$store.dispatch('send', {
      method: 'put',
      url: `${api}${taskid}/state/${state}`
    })
    vm.$emit('statechange', res.data)
    vm.$store.dispatch('toast', { message: 'status změněn' })
  } catch(err) {
    vm.$store.dispatch('onerror', err)
  }
}