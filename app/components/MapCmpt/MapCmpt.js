import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'
import { Link, withRouter, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import { feature as topojsonFeature } from 'topojson-client'
import * as R from 'ramda'
import I from 'immutable'

import {
  amber700, amber900, pinkA200, pinkA400, green500
} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import overviewGetter from 'state/shared/overviewGetter'
import worldTopoJson from 'constants/world.topo.json'
import countryNames from 'constants/countryNames'
import gMapStyle from 'constants/gMapStyle.json'

/*

Checklist:

- *DONE* horizontal layer repeat or no-repeat
- *SKIP* limit zoom to limit edges to bounds?
- *SKIP* limit pan to bounds?
- *SKIP* wait for location?
- *DONE* countries with no countryId
- *DONE* countrieIds of map vs countryIds of names
- *DONE* click for all features
- *DONE* legends
- *DONE* colors on hover
- *DONE* colors on change
- *DONE* colors initially
- panTo on countryId change

*/

const worldGeoJson = topojsonFeature(worldTopoJson, worldTopoJson.objects['-'])
const mapColors = {
  hasJournal: pinkA200,
  hasJournalHovered: pinkA400,
  hasPlan: amber700,
  hasPlanHovered: amber900,
  defaultHovered: green500,
}

const computeCountryStyles = (countryInfo) => {
  if (countryInfo && countryInfo.get('hasJournal')) {
    return {
      fillColor: mapColors.hasJournal,
      fillColorHovered: mapColors.hasJournalHovered,
      fillOpacity: .7,
      fillOpacityHovered: .7,
    }
  } else if (countryInfo && countryInfo.get('hasPlan')) {
    return {
      fillColor: mapColors.hasPlan,
      fillColorHovered: mapColors.hasPlanHovered,
      fillOpacity: .7,
      fillOpacityHovered: .7,
    }
  } else {
    return {
      fillColorHovered: mapColors.defaultHovered,
      fillOpacity: 0,
      fillOpacityHovered: .7,
    }
  }
}

const setCountryHoverListeners = (countryId, country, countryInfo) => {
  const {
    fillColor, fillColorHovered, fillOpacity, fillOpacityHovered
  } = computeCountryStyles(countryInfo)

  google.maps.event.addListener(country, 'mouseover', () => {
    country.setOptions({
      fillOpacity: fillOpacityHovered,
      fillColor: fillColorHovered
    })
  })

  google.maps.event.addListener(country, 'mouseout', () => {
    country.setOptions({ fillOpacity, fillColor })
  })
}

const setCountryStyles = (country, countryInfo) => {
  const { fillColor, fillOpacity } = computeCountryStyles(countryInfo)
  country.setOptions({ fillOpacity, fillColor })
}

const clearCountryHoverListeners = (country) => {
  google.maps.event.clearListeners(country, 'mouseover')
  google.maps.event.clearListeners(country, 'mouseout')
}

// const panIfCountryChanged = (pathname, gMap, prevCountryId) => {
//   const currCountryId = matchPath('/countries/:countryId', {
//     path: '/users/:id',
//     exact: true,
//     strict: false
//   }).params.countryId

//   if (currCountryId && currCountryId !== prevCountryId) {
//     gMap.panTo()
//   }
// }

class BareMapCmpt extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      // pathname: PropTypes.string.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    countriesInfo: IPropTypes.orderedMapOf(
      IPropTypes.contains({
        hasPlan: PropTypes.bool.isRequired,
        hasJournal: PropTypes.bool.isRequired,
      }),
      PropTypes.string,
    )
  }

  state = {
    countriesInfo: this.props.countriesInfo
  }

  componentWillReceiveProps = (nextProps) => {
    const newCountriesInfo = nextProps.countriesInfo
    let oldCountriesInfo = this.state.countriesInfo
    let diff = I.Map()

    if (newCountriesInfo === oldCountriesInfo || newCountriesInfo.equals(oldCountriesInfo))
      return

    newCountriesInfo.forEach((newCountryInfo, newCountryId) => {
      let hasChanged = false
      const matchingOldCountryInfo = oldCountriesInfo.get(newCountryId)

      if (matchingOldCountryInfo) {
        oldCountriesInfo = oldCountriesInfo.delete(newCountryId)

        if (
          !newCountryInfo.equals(matchingOldCountryInfo)
          && !(
            newCountryInfo.get('hasJournal')
            && matchingOldCountryInfo.get('hasJournal')
          )
        )
          hasChanged = true
      } else {
        hasChanged = true
      }

      if (hasChanged) {
        const country = this.countryPolygons[newCountryId]
        clearCountryHoverListeners(country)
        setCountryHoverListeners(newCountryId, country, newCountryInfo)
        setCountryStyles(country, newCountryInfo)
      }
    })

    const countriesWithRemovedInfo = oldCountriesInfo

    countriesWithRemovedInfo.forEach((countryInfo, countryId) => {
      const country = this.countryPolygons[countryId]
      clearCountryHoverListeners(country)
      setCountryHoverListeners(countryId, country)
      setCountryStyles(country)
    })

    this.setState({ countriesInfo: newCountriesInfo })
  }

  shouldComponentUpdate = () => false

  componentDidMount = () => {
    const { history, countriesInfo, match } = this.props
    const countryPolygons = {}

    /* Initiate map */
    const gMap = new google.maps.Map(this.mapEl, {
      zoom: 3,
      center: { lat: 45, lng: 0 },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      backgroundColor: '#b3e5fc',
      styles: gMapStyle,
    })

    /* Add SVG shapes to the map */
    worldGeoJson.features.forEach((feature) => {
      const countryId = feature.properties.id
      const countryInfo = countriesInfo.get(countryId)
      const { fillOpacity, fillColor } = computeCountryStyles(countryInfo)

      /* Derive the country's Google-compatible coordinates from GeoJSON  */
      const reducer = (acc, coords) => {
        if (typeof coords[0][0] === 'number')
          acc.push(coords.map(coord => new google.maps.LatLng(coord[1], coord[0])))
        else
          acc = coords.reduce(reducer, acc)

        return acc
      }

      const gCoords = feature.geometry.coordinates.reduce(reducer, [])

      /* Create the Google Map Polygon of the country */
      const country = new google.maps.Polygon({
        paths: gCoords,
        strokeWeight: 0,
        fillOpacity, fillColor,
      })

      countryPolygons[countryId] = country

      /* Add Listeners to the Country Polygon*/
      if (countryId !== 'null') {
        google.maps.event.addListener(country, 'click', () => {
          history.push(`/countries/${countryId}`)
        })

        setCountryHoverListeners(countryId, country, countryInfo)
      }

      /* Add the Country Polygon to the Map*/
      country.setMap(gMap)
    })

    this.countryPolygons = countryPolygons

    /* Adjust custom controls' styles then add to the map's controls */
    this.legendWrpr.style['margin-top'] = '10px'
    this.legendWrpr.style['margin-left'] = '10px'
    this.overviewWrpr.style['margin-bottom'] = '24px'
    gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(this.legendWrpr)
    gMap.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.overviewWrpr)
  }

  overviewWrpr = document.createElement('div')
  OverviewPortal = ({ children }) => ReactDOM.createPortal(children, this.overviewWrpr)
  legendWrpr = document.createElement('div')
  LegendPortal = ({ children }) => ReactDOM.createPortal(children, this.legendWrpr)

  mapRef = (mapEl) => {
    this.mapEl = mapEl
  }

  render = () => (
    <div className='h-100'>
      <this.OverviewPortal>
        <Link to='/overview'>
          <RaisedButton label='View Overall Stats' primary />
        </Link>
      </this.OverviewPortal>

      <this.LegendPortal>
        <Paper className='pa2 f6'>
          <div className='flex items-center'>
            <div style={{ backgroundColor: pinkA200, marginRight: 6 }} className='w1 h1 dib mb2' />
            <div>travelled</div>
          </div>
          <div className='flex items-center'>
            <div style={{ backgroundColor: amber700, marginRight: 6 }} className='w1 h1 dib' />
            <div>planned</div>
          </div>
        </Paper>
      </this.LegendPortal>

      <div ref={this.mapRef} className='h-100' />
    </div>
  )
}

const mapStateToProps = state => ({
  countriesInfo: overviewGetter(state).get('countriesInfo'),
})

const MapCmpt = withRouter(connect(mapStateToProps)(BareMapCmpt))

export { BareMapCmpt }
export default MapCmpt
