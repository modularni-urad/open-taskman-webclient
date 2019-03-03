import {observable, action, computed} from 'mobx'
import {DOC_TYPES} from '../consts'

export default class TaskDetailStore {

  constructor (store, id) {
    this.store = store
    this.load(id)
    this.loadComments(id)
  }

  @observable record = {}
  @observable comments = []
  @observable comment = ''
  @observable loading = true


  load (id) {
    return this.store.api.get(`/tasks/${id}`)
    .then(this.onLoaded.bind(this))
  }
  @action onLoaded (data) {
    this.record = data
    this.loading = false
  }

  loadComments (id) {
    return this.store.api.get(`/tasks/${id}/comments`)
    .then(this.onCommentsLoaded.bind(this))
  }
  @action onCommentsLoaded (data) {
    this.comments = data
  }

  @action updateComment (val) {
    this.comment = val
  }
  @action saveComment () {
    const url = `/tasks/${this.record.id}/comments`
    return this.store.api.post(url, {content: this.comment})
    .then(this.onSaved.bind(this))
  }

  @computed get disabled () {
    return this.comment.length < 1
  }

  @action onSaved (saved) {
    this.comments.push({
      content: this.comment,
      id: saved[0],
      author: this.record.owner
    })
    this.comment = ''
  }

}
