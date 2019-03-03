import {observable, action, computed} from 'mobx'
import {DOC_TYPES} from '../consts'

export default class Logintore {

  constructor (store) {
    this.store = store
  }

  title = 'Login form'

  @observable creds = {
    uname: '',
    pwd: ''
  }
  @observable error = false

  @computed get disabled () {
    return false
  }

  @action save () {
    this.store.api.login(JSON.parse(JSON.stringify(this.creds)))
    .then(this.onSaved.bind(this))
    .catch(this.onError.bind(this))
  }

  @action onSaved (data) {
    this.store.onLoggedIn()
  }

  @action onError (err) {
    this.error = err
  }

  @action onChange (text, attr) {
    this.creds[attr] = text
  }

}
