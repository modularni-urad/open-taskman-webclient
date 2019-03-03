import {observable, action, computed} from 'mobx'
import DataManipStore from './base'
import {DOC_TYPES} from '../consts'

export default class AddDocStore extends DataManipStore {

  constructor (store, params) {
    super()
    this.store = store
    this.params = params
    this.validators = {
      'name': (val) => this.isMandatory('name', val)
    }
    this.onLoaded({
      name: '',
      due: '',
      complete: 0
    })
  }

  saveEntry (data) {
    return this.store.api.post('/tasks', data)
  }

  isMandatory (attr, val) {
    if (!val || val.length === 0) {
      return 'tohle je povinne'
    }
  }

  @computed get title () {
    return 'novy ukol'
  }

  @computed get disabled () {
    return this.errors.size > 0
  }

  @action onSaved (saved) {
    this.store.closeModal()
    this.store.data.push(saved)
  }

}
