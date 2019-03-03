import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {Typeahead, menuItemContainer, Menu} from 'react-bootstrap-typeahead'

@observer
export default class MyAsyncType extends React.Component {
  state = {
    allowNew: true,
    isLoading: false,
    caseSensitive: false,
    ignoreDiacritics: true,
    // options: []
  }

  render() {
    const {
      record, attr, label, errors, onSelected, options, disabled,
      placeholder, labelKey, MenuItemConponent, multiple = false
    } = this.props
    const errorText = errors.has(attr) ? errors.get(attr) : undefined
    const validationState = errorText ? 'error' : null
    const val = record.get(attr) || null
    const selected = multiple ? (
      val ? val.split(',') : []
    ) : (
      val !== null ? [val] : []
    )

    return (
      <FormGroup validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <Typeahead
          {...this.state}
          disabled={disabled}
          multiple={multiple}
          options={options}
          labelKey={labelKey}
          defaultSelected={selected}
          onSearch={this._handleSearch}
          onChange={this._handleChange}
          placeholder={placeholder}
          renderMenuItemChildren={(option, props) => (
            <MenuItemConponent key={option.id} item={option} />
          )}
        />
        {errorText ? <HelpBlock>{errorText}</HelpBlock> : null}
      </FormGroup>
    )
  }

  _handleChange = (val) => {
    const {attr, onChange, multiple} = this.props
    const l = val.map(i => {
      return i.value ? i.value : i
    })
    onChange(attr, l.join(','))
  }

  _handleSearch = (query) => {
    const {handleSearch} = this.props
    this.setState({isLoading: true})
    handleSearch(query).then(data => {
      this.setState({
        isLoading: false,
        options: data
      })
    })
  }
}
