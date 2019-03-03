import React from 'react'
import {observer} from 'mobx-react'
import {DOC_TYPES, MODAL_NAMES} from '../consts'

const icons = {
  [DOC_TYPES.FOLDER]: 'fa-folder',
  [DOC_TYPES.TEXT]: 'fa-file-alt'
}

const TextView = observer(({store}) => {
  return store.loading ? (<h4>načítám</h4>) : (
    <table className='table table-sm'>
      <thead>
        <tr>
          <th scope='col'>Nazev</th>
          <th scope='col'>Progress</th>
          <th scope='col'>Deadline</th>
          <th scope='col'>Majitel</th>
          <th scope='col'>Tagz</th>
        </tr>
      </thead>
      <tbody>
        {
          store.data.map((i, idx) => (
            <tr key={idx}>
              <th scope='row'>
                <a href='javascript:void(0)' onClick={() => store.showModal(MODAL_NAMES.TASKDETAIL, i.id)}>
                  <i className={`fas ${icons[i.typ]}`} /> {i.name}
                </a>
              </th>
              <td>{i.progress}</td>
              <td>{store.formatDate(i.due)}</td>
              <td>{i.owner}</td>
              <td>{i.tags}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
})

export default TextView
