import React from 'react'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import I from 'immutable'
import * as R from 'ramda'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

import * as FU from 'services/functionalUtils'
import CountryName from 'components/countryName'

const validationRules = {
  planName: planName => !planName && 'Plan name is required',
}

class PlanForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    initialValues: IPropTypes.contains({
      id: PropTypes.string.isRequired,
      planName: PropTypes.string.isRequired,
      notes: PropTypes.string,
      departure: PropTypes.instanceOf(Date),
      homecoming: PropTypes.instanceOf(Date),
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        countryId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    values: I.Map(),
    errors: {},
    dirtyFields: [],
    initialValues: this.props.initialValues,
  }

  makeHandleChange = fieldName => (ev, newVal) => {
    const error = validationRules[fieldName]
      ? validationRules[fieldName](newVal, this.state.values)
      : ''

    this.setState(({initialValues, values, errors}) => ({
      initialValues: initialValues && initialValues.filter((v, k) =>
        k !== fieldName
      ),
      values: values.set(fieldName, newVal),
      errors: R.merge(errors, { [fieldName]: error }),
    }))
  }

  getFinalProp = (fieldName) => {
    const { values, initialValues } = this.state

    if (values.get(fieldName))
      return values.get(fieldName)
    else if (initialValues && initialValues.get(fieldName))
      return initialValues.get(fieldName)
  }

  handleChangePlanName = this.makeHandleChange('planName')
  handleChangeNotes = this.makeHandleChange('notes')
  handleChangeDeparture = this.makeHandleChange('departure')
  handleChangeHomecoming = this.makeHandleChange('homecoming')
  handleDelete = () => {
    const { match, history, initialValues } = this.props
    const id = initialValues.get('id')
    this.props.handleDelete(id)

    history.push(`/countries/${match.params.countryId}`)
  }
  handleSubmit = (ev) => {
    ev.preventDefault()

    // Merge values with final initial values, if any
    const finalValues = this.state.initialValues
      ? this.state.initialValues.merge(this.state.values)
      : this.state.values

    // Validate all fields
    const errors = Object.keys(validationRules).reduce((errorsAcc, fieldName) => {
      const error = validationRules[fieldName](finalValues.get(fieldName), finalValues)

      errorsAcc[fieldName] = error

      return errorsAcc
    }, {})

    const isFormValid = !Object.values(errors)
      .find(error => !!error)

    this.setState({ errors })

    if (isFormValid) {
      const {
        handleSubmit,
        history,
        match,
      } = this.props
      const trimmedValues = finalValues.map(FU.trimIfString)

      handleSubmit(trimmedValues)
      history.push(`/countries/${match.params.countryId}`)
    }
  }

  rootElRef = (rootEl) => {
    this.rootEl = rootEl
  }

  render = () => {
    const countryId = this.props.match.params.countryId
    const { values, errors, initialValues } = this.state

    return (
      <form
        className='pt2 pb3 pr2 pl2'
        ref={this.rootElRef}
        onSubmit={this.handleSubmit}
      >
        <CountryName
          className='plan-form-country-name ma0'
          wrapperEl='h2'
          countryId={countryId}
        />
        <TextField
          className='w-100--i db--i'
          data-name='PlanNameField'
          floatingLabelText='Plan Name*'
          floatingLabelFixed
          onChange={this.handleChangePlanName}
          errorText={errors.planName || ''}
          value={this.getFinalProp('planName') || ''}
        />
        <TextField
          className='w-100--i db--i'
          data-name='NotesField'
          floatingLabelText='Notes'
          floatingLabelFixed
          onChange={this.handleChangeNotes}
          multiLine
          rowsMax={4}
          value={this.getFinalProp('notes') || ''}
        />
        <DatePicker
          textFieldStyle={{ width: '100%' }}
          data-name='DepartureField'
          floatingLabelText='Departure Date'
          floatingLabelFixed
          onChange={this.handleChangeDeparture}
          errorText={errors.departure || ''}
          minDate={new Date()}
          maxDate={values.get('homecoming')}
          value={this.getFinalProp('departure') || null}
        />
        <DatePicker
          textFieldStyle={{ width: '100%' }}
          data-name='HomecomingField'
          floatingLabelText='Homecoming Date'
          floatingLabelFixed
          onChange={this.handleChangeHomecoming}
          errorText={errors.homecoming || ''}
          minDate={values.get('departure') || new Date()}
          value={this.getFinalProp('homecoming') || null}
        />

        <div className='tr'>
          {
            (initialValues && initialValues.get('id')) &&
            <RaisedButton
              onClick={this.handleDelete}
              className='plan-form-delete-btn mt3 mr3'
              secondary
              label='Delete'
            />
          }

          <RaisedButton
            className='mt3'
            primary
            label='Save'
            type='submit'
          />
        </div>
      </form>
    )
  }
}

export default PlanForm
