import React from 'react'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import I from 'immutable'
import * as R from 'ramda'
import { Switch, Route } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

import * as FU from 'services/functionalUtils'

const validationRules = {
  title: title => !title && 'Plan name is required',
}

class PlanForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    initialValues: IPropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      copy: PropTypes.string,
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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    isNotFound: PropTypes.bool,
    setNotFound: PropTypes.func,
  }

  state = {
    values: this.props.initialValues || I.Map(),
    errors: {},
    dirtyFields: [],
  }

  componentWillMount = () => {
    const { isNotFound, setNotFound, location } = this.props

    if (isNotFound)
      setNotFound(location.pathname)
  }

  makeHandleChange = fieldName => (ev, newVal) => {
    const error = validationRules[fieldName]
      ? validationRules[fieldName](newVal, this.state.values)
      : ''

    this.setState(({ values, errors }) => ({
      values: values.set(fieldName, newVal),
      errors: R.merge(errors, { [fieldName]: error }),
    }))
  }

  handleChangeTitle = this.makeHandleChange('title')
  handleChangeCopy = this.makeHandleChange('copy')
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

    const { values } = this.state

    // Validate all fields
    const errors = Object.keys(validationRules)
      .reduce((errorsAcc, fieldName) => {
        const validator = validationRules[fieldName]
        const error = validator(values.get(fieldName), values)

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
      const trimmedValues = values.map(FU.trimIfString)

      handleSubmit(trimmedValues)
      history.push(`/countries/${match.params.countryId}`)
    }
  }

  rootElRef = (rootEl) => {
    this.rootEl = rootEl
  }

  render = () => {
    const { initialValues } = this.props
    const { values, errors } = this.state

    return (
      <form
        className='pt0 pb3 pr2 pl2'
        ref={this.rootElRef}
        onSubmit={this.handleSubmit}
      >
        <div className='dn db-l pt3 fw5 f5'>
          <Switch>
            <Route exact path='/countries/:countryId/plans/new' render={() => 'Add New Plan'} />
            <Route exact path='/countries/:countryId/plans/:id' render={() => 'Edit Plan'} />
          </Switch>
        </div>
        <TextField
          className='w-100--i db--i'
          data-name='TitleField'
          floatingLabelText='Title*'
          floatingLabelFixed
          onChange={this.handleChangeTitle}
          errorText={errors.title || ''}
          value={values.get('title') || ''}
        />
        <TextField
          className='w-100--i db--i'
          data-name='CopyField'
          floatingLabelText='Notes'
          floatingLabelFixed
          onChange={this.handleChangeCopy}
          multiLine
          rowsMax={4}
          value={values.get('copy') || ''}
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
          value={values.get('departure') || null}
        />
        <DatePicker
          textFieldStyle={{ width: '100%' }}
          data-name='HomecomingField'
          floatingLabelText='Homecoming Date'
          floatingLabelFixed
          onChange={this.handleChangeHomecoming}
          errorText={errors.homecoming || ''}
          minDate={values.get('departure') || new Date()}
          value={values.get('homecoming') || null}
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
