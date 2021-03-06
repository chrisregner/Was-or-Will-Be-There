import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { feature as topojsonFeature } from 'topojson-client'

import {
  amber700, amber900, pinkA200, pinkA400, green500,
} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import overviewGetter from 'state/shared/overviewGetter'
import gMapStyle from 'constants/gMapStyle.json'
import NonALink from 'components/NonALink'
import checkIfMobile from 'services/checkIfMobile'

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
- *DONE* panTo on countryId change

*/

const getGoogleMap = () => pnjScripts.get('googleMap')
const mapColors = {
  hasJournal: pinkA200,
  hasJournalHovered: pinkA400,
  hasPlan: amber700,
  hasPlanHovered: amber900,
  defaultHovered: green500,
}

const computeCountryStyles = (countryInfo) => {
  if (countryInfo && countryInfo.get('hasJournal'))
    return {
      hovered: {
        fillColor: mapColors.hasJournalHovered,
        fillOpacity: 0.7,
      },
      base: {
        fillColor: mapColors.hasJournal,
        fillOpacity: 0.7,
        strokeWeight: 1,
        strokeColor: '#b3e5fc',
      },
    }
  else if (countryInfo && countryInfo.get('hasPlan'))
    return {
      hovered: {
        fillColor: mapColors.hasPlanHovered,
        fillOpacity: 0.7,
      },
      base: {
        fillColor: mapColors.hasPlan,
        fillOpacity: 0.7,
        strokeWeight: 1,
        strokeColor: '#b3e5fc',
      },
    }
  else
    return {
      hovered: {
        fillColor: mapColors.defaultHovered,
        fillOpacity: 0.7,
      },
      base: {
        fillOpacity: 0,
        strokeWeight: 0,
      },
    }
}

const setCountryHoverListeners = (countryId, country, countryInfo) => {
  const { hovered, base } = computeCountryStyles(countryInfo)

  getGoogleMap().event.addListener(country, 'mouseover', () => {
    country.setOptions(hovered)
  })

  getGoogleMap().event.addListener(country, 'mouseout', () => {
    country.setOptions(base)
  })
}

const setCountryStyles = (country, countryInfo) => {
  const { base } = computeCountryStyles(countryInfo)
  country.setOptions(base)
}

const clearCountryHoverListeners = (country) => {
  getGoogleMap().event.clearListeners(country, 'mouseover')
  getGoogleMap().event.clearListeners(country, 'mouseout')
}

const panIfCountryChanged = ({ nextCountryId, gMap, countryPolygons, currCountryId }) => {
  if (checkIfMobile()) return

  if (nextCountryId && nextCountryId !== currCountryId) {
    const googleMap = getGoogleMap()
    const bounds = new googleMap.LatLngBounds()
    const nextCountryPaths = countryPolygons[nextCountryId]
      .getPaths()
    const pathsIteratee = (path) => {
      if (path instanceof getGoogleMap().LatLng)
        bounds.extend(path)
      else
        path.forEach(pathsIteratee)
    }

    nextCountryPaths.forEach(pathsIteratee)
    gMap.panTo(bounds.getCenter())
  }
}

class BareMapCmpt extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        countryId: PropTypes.string,
      }).isRequired,
    }).isRequired,
    countriesInfo: IPropTypes.orderedMapOf(
      IPropTypes.contains({
        hasPlan: PropTypes.bool.isRequired,
        hasJournal: PropTypes.bool.isRequired,
      }),
      PropTypes.string,
    ),
  }

  state = {
    countriesInfo: this.props.countriesInfo,
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.isGMapLoaded) return

    const { match } = this.props
    const newCountriesInfo = nextProps.countriesInfo
    let oldCountriesInfo = this.state.countriesInfo

    /* if the route points to a country different from the previous, pan the map to it */
    panIfCountryChanged({
      nextCountryId: nextProps.match.params.countryId,
      gMap: this.gMap,
      countryPolygons: this.countryPolygons,
      currCountryId: match.params.countryId,
    })

    /* If countries info didn't change, there's nothing else to do here */
    if (newCountriesInfo === oldCountriesInfo || newCountriesInfo.equals(oldCountriesInfo))
      return

    /* Iterate thru new countryInfo and compare it against its old equivalent */
    newCountriesInfo.forEach((newCountryInfo, newCountryId) => {
      let hasChanged = false
      const matchingOldCountryInfo = oldCountriesInfo.get(newCountryId)

      if (matchingOldCountryInfo) {
        oldCountriesInfo = oldCountriesInfo.delete(newCountryId)

        if (
          !newCountryInfo.equals(matchingOldCountryInfo) &&
          !(
            newCountryInfo.get('hasJournal') &&
            matchingOldCountryInfo.get('hasJournal')
          )
        )
          hasChanged = true
      } else {
        hasChanged = true
      }

      /* if a country info is new or modified, reconfigure the corresponding country polygon */
      if (hasChanged) {
        const country = this.countryPolygons[newCountryId]
        clearCountryHoverListeners(country)
        setCountryHoverListeners(newCountryId, country, newCountryInfo)
        setCountryStyles(country, newCountryInfo)
      }
    })

    /* Any old country info with no new equivalent are to be reset to the default configuration */
    const countriesWithRemovedInfo = oldCountriesInfo

    countriesWithRemovedInfo.forEach((countryInfo, countryId) => {
      const country = this.countryPolygons[countryId]
      clearCountryHoverListeners(country)
      setCountryHoverListeners(countryId, country)
      setCountryStyles(country)
    })

    /* Save the latest country info in state, to be compared to the newer ones */
    this.setState({ countriesInfo: newCountriesInfo })
  }

  shouldComponentUpdate = () => !this.isGMapLoaded

  componentDidMount = () => {
    const setupGMap = (worldTopoJson) => {
      const mapData = pnjScripts.get('mapData')
      const worldGeoJson = topojsonFeature(mapData, mapData.objects['-'])
      const { history, countriesInfo, match } = this.props
      const countryPolygons = {}

      this.isGMapLoaded = true

      const googleMap = getGoogleMap()

      /* Initiate map */
      const gMap = new googleMap.Map(this.mapEl, {
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
        const { base } = computeCountryStyles(countryInfo)

        /* Derive the country's Google-compatible coordinates from GeoJSON  */
        const reducer = (acc, coords) => {
          if (typeof coords[0][0] === 'number')
            acc.push(coords.map(coord => new googleMap.LatLng(coord[1], coord[0])))
          else
            acc = coords.reduce(reducer, acc)

          return acc
        }

        const gCoords = feature.geometry.coordinates.reduce(reducer, [])

        /* Create the Google Map Polygon of the country */
        const country = new googleMap.Polygon({
          paths: gCoords,
          ...base,
        })

        countryPolygons[countryId] = country

        /* Add Listeners to the Country Polygon */
        if (countryId !== 'null') {
          getGoogleMap().event.addListener(country, 'click', () => {
            history.push(`/countries/${countryId}/plans`)
          })

          setCountryHoverListeners(countryId, country, countryInfo)
        }

        /* Add the Country Polygon to the Map */
        country.setMap(gMap)
      })

      this.countryPolygons = countryPolygons

      /* Adjust custom controls' styles then add to the map's controls */
      this.legendWrpr.style['margin-top'] = '10px'
      this.legendWrpr.style['margin-left'] = '10px'
      this.overviewWrpr.style['margin-bottom'] = '24px'
      gMap.controls[getGoogleMap().ControlPosition.TOP_LEFT].push(this.legendWrpr)
      gMap.controls[getGoogleMap().ControlPosition.BOTTOM_CENTER].push(this.overviewWrpr)

      /* if the route points to a country, pan the map to it */
      panIfCountryChanged({
        nextCountryId: match.params.countryId,
        gMap,
        countryPolygons,
      })

      /* Save the map */
      this.gMap = gMap
    }

    /* Make sure both Google Map and map data is loaded before rendering the map */

    if (pnjScripts.get('googleMap') && pnjScripts.get('mapData'))
      setupGMap()
    else
      pnjScripts.setCallback(['googleMap', 'mapData'], setupGMap)
  }

  overviewWrpr = document.createElement('div')
  OverviewPortal = ({ children }) => ReactDOM.createPortal(children, this.overviewWrpr)
  legendWrpr = document.createElement('div')
  LegendPortal = ({ children }) => ReactDOM.createPortal(children, this.legendWrpr)

  mapRef = (mapEl) => {
    this.mapEl = mapEl
  }

  render = () => (
    <div className='h-100' style={{ backgroundColor: '#b3e5fc' }}>
      <this.OverviewPortal>
        <NonALink to='/stats'>
          <RaisedButton label='View Overall Stats' primary />
        </NonALink>
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

      <div ref={this.mapRef} className='h-100'>
        <div className='loader-wrapper-wrapper relative' style={{ top: -48 }}>
          <div className='loader-wrapper'>
            <div className='la-ball-scale-ripple-multiple la-2x la-dark'>
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  countriesInfo: overviewGetter(state).get('countriesInfo'),
})

const MapCmpt = connect(mapStateToProps)(BareMapCmpt)

export { BareMapCmpt }
export default MapCmpt
