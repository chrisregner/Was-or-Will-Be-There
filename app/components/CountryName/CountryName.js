import React from 'react'
import PropTypes from 'prop-types'
import _requestPromise from 'request-promise'
import c from 'classnames'

import ErrorIcon from 'material-ui/svg-icons/alert/error'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

import * as FU from 'services/functionalUtils'

const countryNameShell = ({ requestPromise }) =>
  class CountryName extends React.Component {
    static propTypes = {
      countryId: PropTypes.string.isRequired,
      wrapperEl: PropTypes.string,
    }

    static defaultProps = {
      wrapperEl: 'div',
    }

    state = {
      error: null,
      countryName: null,
      isErrorVisible: false,
    }

    componentDidMount = () => {
      const countryId = this.props.countryId.toUpperCase()
      const countriesUrl = 'https://cdn.rawgit.com/hjnilsson/country-flags/master/countries.json'

      requestPromise(countriesUrl)
        .then(countryNamesJson => {
          const countryNames = JSON.parse(countryNamesJson)
          const countryName = countryNames[countryId]

          this.setState({ countryName })
        })
        .catch(error => {
          console.error('Error upon retrieving country name: ', error)

          this.setState({ error })
        })
    }

    handleErrorToggle = () => {
      this.setState(FU.makePropNegator('isErrorVisible'))
    }

    render = () => {
      let content
      const {
        countryName,
        error,
        isErrorVisible,
      } = this.state
      const {
        wrapperEl: WrapperEl,
        countryId,
        ...otherProps
      } = this.props

      // Sorry, an error is encountered while getting the county name. Please try refreshing the app.
      if (countryName)
        content = this.state.countryName
      else if (error)
        content = (
          <div className='flex'>
            <div className='flex-grow-1 f4 self-center'>County Code: {countryId.toUpperCase()}</div>
            <div className='relative'>
              <IconButton
                aria-label='Show error'
                aria-haspopup='true'
                iconStyle={{ width: 18, height: 18 }}
                style={{ padding: 0, width: 36, height: 36 }}
                onClick={this.handleErrorToggle}
              >
                <ErrorIcon />
              </IconButton>
              <Paper
                aria-hidden={isErrorVisible ? 'false' : 'true'}
                className={c(
                  isErrorVisible
                    ? 'animated fadeIn'
                    : 'animated fadeOut',
                  'absolute top-100 right-50 z-2 pa2 f6 lh-copy normal'
                )}
                style={{ width: '12rem' }}
                zDepth={2}
              >
                <p className='mt0 mb2'>Sorry... there was an error while getting the country name. But we can try refreshing the page!</p>
                <p className='ma0 silver'><em>{error.message}</em></p>
              </Paper>
            </div>
          </div>
        )
      else
        content = (<span data-name='loader'>&hellip;</span>)

      return (<WrapperEl {...otherProps}>{content}</WrapperEl>)
    }
  }

const CountryName = countryNameShell({
  requestPromise: _requestPromise,
})

export { countryNameShell }
export default CountryName
