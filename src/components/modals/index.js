import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Button} from 'react-bootstrap'
import {MODAL_NAMES} from '../../consts'
import AddTaskForm from './addTask'
import LoginForm from './login'

const ModalEditor = ({store}) => {
  //
  function _createForm () {
    switch (store.activeModal) {
      case MODAL_NAMES.ADD_TASK: return <AddTaskForm store={store.modalStore} />
      case MODAL_NAMES.LOGIN: return <LoginForm store={store.modalStore} />
    }
  }

  return store.activeModal === null ? null : (
    <div className='static-modal'>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{store.modalStore.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body><form>{_createForm()}</form></Modal.Body>

        <Modal.Footer>
          <Button bsStyle='primary' disabled={store.modalStore.disabled}
            onClick={() => store.modalStore.save()}>Uloz</Button>
          <Button onClick={() => store.closeModal()}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default observer(ModalEditor)
