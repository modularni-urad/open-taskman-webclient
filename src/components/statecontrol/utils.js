export async function setState (store, state, props) {
  const taskid = props.task.id
  const api = props.cfg.url
  try {
    const res = await store.dispatch('send', {
      method: 'put',
      url: `${api}${taskid}/state/${state}`
    })
    Object.assign(props.task, res.data)
    store.dispatch('toast', { message: 'status změněn' })
  } catch(err) {
    const message = err.response.data
    store.dispatch('toast', { message, type: 'error' })
    throw err
  }
}