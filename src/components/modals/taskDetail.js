import {observer} from 'mobx-react'
import {Modal, Button, FormControl} from 'react-bootstrap'
import {MODAL_NAMES} from '../../consts'

function Tags (tags) {
  return tags.split(',').map(i => `#${i} `)
}

const TaskDetailModal = ({store}) => {
  const mstore = store.modalStore

  return store.activeModal !== MODAL_NAMES.TASKDETAIL || mstore.loading ? null : (
    <div className='static-modal'>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{mstore.record.name} ({mstore.record.progress}%)</Modal.Title>
          {mstore.record.owner}@{store.formatDate(mstore.record.created)}: {Tags(mstore.record.tags)}
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormControl componentClass='textarea' value={mstore.comment} placeholder='komentar'
              onChange={(evt) => mstore.updateComment(evt.target.value)} />

            <Button bsStyle='primary' disabled={store.modalStore.disabled}
              onClick={() => mstore.saveComment()}>Uloz</Button>
          </form>
          {
            mstore.comments.map((i, idx) => {
              return (
                <div key={idx}>{i.author}@{store.formatDate(i.created)}: {i.content}</div>
              )
            })
          }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => store.closeModal()}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default observer(TaskDetailModal)
