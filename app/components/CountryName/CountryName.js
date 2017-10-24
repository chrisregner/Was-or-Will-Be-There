import React from 'react'
import PropTypes from 'prop-types'
import _requestPromise from 'request-promise'

const CountryNameShell = ({ requestPromise }) =>
  class CountryName extends React.Component {
    static propTypes = {
      countryId: PropTypes.string.isRequired
    }

    state = {
      status: 'loading',
      countryName: '',
    }

    componentDidMount = () => {
      const countryId = this.props.countryId.toUpperCase()
      const countriesUrl = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/countries.json'

      requestPromise(countriesUrl)
        .then(res => {
          const countryNames = JSON.parse(res)
          const countryName = countryNames[countryId]

          this.setState({
            status: 'success',
            countryName,
          })
        })
        .catch(error => {
          console.log(error)

          this.setState({
            status: 'error'
          })
        })
    }

    render = () => {
      let content
      const status = this.state.status

      if (status === 'loading')
        content = (<span data-name='loader'>&hellip;</span>)
      else if (status === 'error')
        content =  (
          <span>
            County Code: {this.props.countryId.toUpperCase()}
          </span>
        )
      else
        content = (<span>{this.state.countryName}</span>)

      return (<span>{content}</span>)
    }
  }

const CountryName = CountryNameShell({
  requestPromise: _requestPromise,
})

export { CountryNameShell }
export default CountryName
