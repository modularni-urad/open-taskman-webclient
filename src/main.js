import React from 'react'
import ReactDOM from 'react-dom'
import AppStore from './stores/main'
import ContentView from './components/contentView'
import Menu from './components/menu'
import ModalManager from './components/modals'
import TaskDetailModal from './components/modals/taskDetail'
// useStrict(true)

const store = new AppStore()
store.load(22)

const mount = document.getElementById('root')  // mountpoint

ReactDOM.render((
  <div style={{width: '100%'}}>
    <Menu store={store} />
    <ModalManager store={store} />
    <TaskDetailModal store={store} />
    <div className='row'>
      <div className='col-xs-12'>
        <ContentView store={store} />
      </div>
    </div>
  </div>
), mount)
