import React from 'react'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import requiredIf from 'react-required-if'
import I from 'immutable'
import * as R from 'ramda'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

const validationRules = {
  planName: planName => !planName && 'Plan name is required'
}

class PlanForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: IPropTypes.contains({
      planName: PropTypes.string.isRequired,
      notes: PropTypes.string,
      departure: requiredIf(PropTypes.instanceOf(Date), props => !!props.homecoming),
      homecoming: requiredIf(PropTypes.instanceOf(Date), props => !!props.departure),
    })
  }

  state = {
    values: I.Map(),
    errors: {},
  }

  makeHandleChange = (fieldName) => (ev, newVal) => {
    const error = validationRules[fieldName]
      ? validationRules[fieldName](newVal, this.state.values)
      : ''

    this.setState(prevState => ({
      values: prevState.values.set(fieldName, newVal),
      errors: R.merge(prevState.errors, { [fieldName]: error }),
    }))
  }

  handleChangePlanName = this.makeHandleChange('planName')
  handleChangeNotes = this.makeHandleChange('notes')
  handleChangeDeparture = this.makeHandleChange('departure')
  handleChangeHomecoming = this.makeHandleChange('homecoming')
  handleSubmit = (ev) => {
    ev.preventDefault()

    /* validate all fields */
    const errors = Object.keys(validationRules).reduce((errorsAcc, fieldName) => {
      const values = this.state.values
      const error = validationRules[fieldName](values.get(fieldName), values)

      errorsAcc[fieldName] = error

      return errorsAcc
    }, {})

    this.setState({ errors })
  }

  render = () => {
    const { values, errors } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          data-name="PlanNameField"
          floatingLabelText="Plan Name"
          onChange={this.handleChangePlanName}
          value={values.get('planName') || ''}
          errorText={errors.planName || ''}
        />
        <TextField
          data-name="NotesField"
          floatingLabelText="Notes"
          onChange={this.handleChangeNotes}
          value={values.get('notes') || ''}
          multiLine={true}
          rowsMax={4}
        />
        <DatePicker
          data-name="DepartureField"
          floatingLabelText="Departure Date"
          onChange={this.handleChangeDeparture}
          value={values.get('departure')}
          errorText={errors.departure || ''}
          minDate={new Date()}
          maxDate={values.get('homecoming')}
        />
        <DatePicker
          data-name="HomecomingField"
          floatingLabelText="Homecoming Date"
          onChange={this.handleChangeHomecoming}
          value={values.get('homecoming')}
          errorText={errors.homecoming || ''}
          minDate={values.get('departure')}
        />
      </form>
    )
  }
}

export default PlanForm
