import {observable, action, computed} from 'mobx'
import {MODAL_NAMES, DOC_TYPES} from '../consts'
import APIService from './apiService'
import AddTaskStore from './addTask'
import LoginStore from './login'
// import SubtsEditStore from './substsEdit'
// import PermsEditStore from './permsEdit'

const modalMapping = {
  [MODAL_NAMES.ADD_TASK]: AddTaskStore,
  [MODAL_NAMES.LOGIN]: LoginStore
  // [MODAL_NAMES.PERMS]: PermsEditStore,
  // [MODAL_NAMES.SUBSTS]: SubtsEditStore
}

export default class StateStore {

  constructor () {
    this.api = new APIService(this.on401.bind(this))
    this.loginPromises = []
    this.api.get(`/tags/`).then(data => {
      this.options = data
    })
  }

  on401 (err) {
    this.activeModal !== MODAL_NAMES.LOGIN && this.showModal(MODAL_NAMES.LOGIN)
    return new Promise((resolve, reject) => {
      this.loginPromises.push(resolve)
    })
  }

  onLoggedIn () {
    this.loginPromises.map(resolve => resolve())
    this.loginPromises = []
    this.closeModal()
  }

  load (id) {
    this.loadFolderContent(null)
  }

  loadFolderContent (folderId) {
    const id = folderId || ''
    window.history.replaceState(id, id, id)
    this.api.get(`/tasks/`)
    .then(this.onLoaded.bind(this))
    .catch(err => console.log(err))
  }

  @observable menuDown = false

  @observable activeModal = null
  @action closeModal () {
    this.activeModal = null
    delete this.modalStore
  }
  @action showModal (name, params) {
    this.activeModal = name
    this.modalStore = new modalMapping[name](this, params)
  }

  @observable data = []
  @observable loading = true

  @action onLoaded (data) {
    this.loading = false
    this.data = data || []
  }

  @action onChange (name, text) {
    this.doc[name] = text
  }

  @action onHomeClick () {
    this.path.clear()
    this.loadFolderContent(null)
  }

  @action onDetailClick (doc) {
    switch (doc.typ) {
      case DOC_TYPES.FOLDER: return this.onFolderClick(doc)
      case DOC_TYPES.TEXT: return window.open(`${Conf.textEditUrl}/${doc.id}`)
    }
  }
}
