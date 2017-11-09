import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setNotFound } from 'state/ui'
import countryNames from 'constants/countryNames'
import CountryNameAndFlag from 'components/CountryNameAndFlag'

class BareSmartCountryNameAndFlag extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        countryId: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    setNotFound: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const { setNotFound, location, match } = this.props

    if (!countryNames[match.params.countryId])
      setNotFound(location.pathname)
  }

  render = () => {
    const { countryId } = this.props.match.params

    return (
      <h2 className='ma0 pt2 ph2 pb0 f4'>
        <CountryNameAndFlag
          className='paper-routes-country-name-and-flag'
          countryId={countryId}
        />
      </h2>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotFound: (pathname) => { dispatch(setNotFound(pathname)) },
})

const SmartCountryNameAndFlag = connect(null, mapDispatchToProps)(BareSmartCountryNameAndFlag)

export { BareSmartCountryNameAndFlag }
export default SmartCountryNameAndFlag
