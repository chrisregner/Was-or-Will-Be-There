import React from 'react'
// import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
// import requiredIf from 'react-required-if'
import I from 'immutable'
import * as R from 'ramda'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import * as FU from 'services/functionalUtils'
import CountryName from 'components/countryName'

const validationRules = {
  planName: planName => !planName && 'Plan name is required',
}

class PlanForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    // initialValues: IPropTypes.contains({
    //   planName: PropTypes.string.isRequired,
    //   notes: PropTypes.string,
    //   departure: requiredIf(PropTypes.instanceOf(Date), props => !!props.homecoming),
    //   homecoming: requiredIf(PropTypes.instanceOf(Date), props => !!props.departure),
    // }),
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

    const isFormValid = !Object.values(errors)
      .find(error => !!error)

    this.setState({ errors })

    if (isFormValid) {
      const {
        handleSubmit,
        history,
        match,
      } = this.props
      const values = this.state.values
      const trimmedValues = values.map(FU.trimIfString)

      handleSubmit(trimmedValues)
      history.push(`/countries/${match.params.countryId}`)
      // call success snackbar
    }
  }

  render = () => {
    const countryId = this.props.match.params.countryId
    const { values, errors } = this.state

    return (
      <form className='pa2' onSubmit={this.handleSubmit}>
        <div className='flex'>
          <Paper className='self-center w2' rounded={false}>
            <img
              className='db'
              src={`https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/${countryId}.svg`}
              alt='Country Flag'
            />
          </Paper>
          <CountryName
            data-name='CountryName'
            className='flex-grow-1 ma0 pl2 f4 lh-title fw5'
            wrapperEl='h2'
            countryId={countryId}
          />
        </div>
        <TextField
          className='field db--i'
          data-name='PlanNameField'
          floatingLabelText='Plan Name*'
          floatingLabelFixed
          onChange={this.handleChangePlanName}
          value={values.get('planName') || ''}
          errorText={errors.planName || ''}
        />
        <TextField
          className='field db--i'
          data-name='NotesField'
          floatingLabelText='Notes'
          floatingLabelFixed
          onChange={this.handleChangeNotes}
          value={values.get('notes') || ''}
          multiLine
          rowsMax={4}
        />
        <DatePicker
          className='field'
          data-name='DepartureField'
          floatingLabelText='Departure Date'
          floatingLabelFixed
          onChange={this.handleChangeDeparture}
          value={values.get('departure')}
          errorText={errors.departure || ''}
          minDate={new Date()}
          maxDate={values.get('homecoming')}
        />
        <DatePicker
          className='field'
          data-name='HomecomingField'
          floatingLabelText='Homecoming Date'
          floatingLabelFixed
          onChange={this.handleChangeHomecoming}
          value={values.get('homecoming')}
          errorText={errors.homecoming || ''}
          minDate={values.get('departure')}
        />
        <RaisedButton
          className='mt3'
          primary
          label='Submit'
          type='submit'
        />
      </form>
    )
  }
}

export { PlanForm as BarePlanForm }
export default PlanForm
