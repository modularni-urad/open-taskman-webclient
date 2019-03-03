import {observer} from 'mobx-react'
import {FormControl, FormGroup, HelpBlock} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import TypeAheadSelect from '../input/typeahead'

const MenuItem = ({item}) => {
  return (<span>{item}</span>)
}

const AddTaskForm = observer(({store}) => (
  <div>
    <FormGroup validationState={store.errors.has('name') === false ? 'success' : 'error'}>
      <FormControl type='text' value={store.record.get('name') || ''} placeholder='nazev'
        onChange={(evt) => store.updateData('name', evt.target.value)} />
      <FormControl.Feedback />
      {
        store.errors.has('name') === false ? null : <HelpBlock>{store.errors.get('name')}.</HelpBlock>
      }
    </FormGroup>

    <DatePicker
      dateFormat='dd/MM/yyyy'
      minDate={new Date()}
      isClearable
      onChange={(val) => store.updateData('due', val.format('DD.MM.YYYY'))}
      value={store.record.get('due')}
    />

    <FormControl type='number' value={store.record.get('complete') === null ? '' : store.record.get('complete')} placeholder='complete'
      onChange={(evt) => store.updateData('complete', evt.target.value)} />

    <TypeAheadSelect label={'tagy'}
      attr='tags' record={store.record}
      onChange={store.updateData.bind(store)} errors={store.errors}
      options={store.store.options}
      labelKey={'value'}
      placeholder='vyber tagy'
      MenuItemConponent={MenuItem} multiple />
  </div>
))

export default AddTaskForm
