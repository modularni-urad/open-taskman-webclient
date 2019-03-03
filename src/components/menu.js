import React from 'react'
import {observer} from 'mobx-react'
import {MODAL_NAMES} from '../consts'

const Menu = ({store}) => {
  return store.loading ? null : (
    <nav className='navbar navbar-default'>
      <a className='navbar-brand' href='javascript:void(0)' onClick={() => store.showModal(MODAL_NAMES.TITLE)}>title</a>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <ul className='nav navbar-nav'>
          <li><a className='nav-item nav-link primary' onClick={() => store.showModal(MODAL_NAMES.ADD_TASK)} href='javascript:void(0)'>+ novy</a></li>
          <li><a className='nav-item nav-link' onClick={() => store.showToday(MODAL_NAMES.SUBSTS)} href='javascript:void(0)'>Dnes</a></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          {
            store.api.auth.user ? [
              <li key='user'><a>Prihlasen: {store.api.auth.user.uname}</a></li>,
              <li key='lg'><a href='javascript:void(0)' onClick={() => store.api.logout()}>logout</a></li>
            ] : (
              <li><a href='javascript:void(0)' onClick={() => store.showModal(MODAL_NAMES.LOGIN)}>login</a></li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export default observer(Menu)
