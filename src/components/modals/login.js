import {observer} from 'mobx-react'
import {FormControl, FormGroup} from 'react-bootstrap'

const AddDocForm = observer(({store}) => (
  <div>
    <FormGroup>
      <FormControl type='text' value={store.creds.uname} placeholder='nazev'
        onChange={(evt) => store.onChange(evt.target.value, 'uname')} />
    </FormGroup>
    <FormGroup>
      <FormControl type='text' value={store.creds.pwds} placeholder='nazev'
        onChange={(evt) => store.onChange(evt.target.value, 'pwd')} />
    </FormGroup>
  </div>
))

export default AddDocForm
