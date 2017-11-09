import React from 'react'
import PropTypes from 'prop-types'
import _requestPromise from 'request-promise'
import c from 'classnames'
import { connect } from 'react-redux'

import ErrorIcon from 'material-ui/svg-icons/alert/error'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

import { setNotFound } from 'state/ui'
import { COUNTRIES_JSON_URL, createFlagUrl } from 'constants/'
import * as FU from 'services/functionalUtils'

const countryLoaderShell = ({ requestPromise }) =>
  class CountryLoader extends React.Component {
    static propTypes = {
      countryId: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      setNotFound: PropTypes.func.isRequired,
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
      const { setNotFound, countryId, pathname } = this.props

      this.request = requestPromise(COUNTRIES_JSON_URL)
        .then((countryNamesJson) => {
          const countryNames = JSON.parse(countryNamesJson)
          const countryName = countryNames[countryId.toUpperCase()]

          if (countryName)
            this.setState({ countryName })
          else
            setNotFound(pathname)
        })
        .catch((error) => {
          console.error('Error upon retrieving country name: ', error)

          this.setState({ error })
        })
    }

    componentWillUnmount = () => {
      this.request.cancel()
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
        pathname,
        setNotFound,
        ...otherProps
      } = this.props

      if (countryName)
        content = this.state.countryName
      else if (error)
        content = (
          <div className='flex items-center'>
            <div className='flex-grow-1 f4'>County Code: {countryId.toUpperCase()}</div>
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
                <p className='mt0 mb2'>Sorry, there was an error while getting the country name. But we can try refreshing the page!</p>
                <p className='ma0 silver'><em>{error.message}</em></p>
              </Paper>
            </div>
          </div>
        )
      else
        content = (<span data-name='loader'>&hellip;</span>)

      return (<WrapperEl {...otherProps}>
        <div className='flex items-center'>
          <Paper className='w2pt5 mr1' rounded={false}>
            <img
              className='db w-100 h-auto f7 normal'
              src={createFlagUrl(countryId)}
              alt='Country Flag'
            />
          </Paper>
          <div className='flex-grow-1 ma0 pl2 f4 lh-title fw5'>
            {content}
          </div>
        </div>
      </WrapperEl>)
    }
  }

const BareCountryLoader = countryLoaderShell({
  requestPromise: _requestPromise,
})

const mapDispatchToProps = dispatch => ({
  setNotFound: (notFoundPath) => {
    dispatch(setNotFound(notFoundPath))
  }
})

const CountryLoader = connect(null, mapDispatchToProps)(BareCountryLoader)

export { countryLoaderShell }
export default CountryLoader
