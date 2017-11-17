import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import worldTopoJson from 'constants/world.topo.json'
import topojsonFeature  from 'topojson-client/src/feature'

/*

AIzaSyAe_z5uQZuI9fDFrEAxfjBlHuanTwg8CNs

limit zoom to limit edges to bounds?
limit pan to bounds?
horizontal layer repeat or no-repeat
click for all features
colors for some countris
  journal (regardless of plan)
  plan
markers for some countries...
  journal (regardless of plan)
  plan
style
  map
  backgroundcolor

wait for location?

 */

const worldGeoJson = topojsonFeature(worldTopoJson, worldTopoJson.objects)
const Wrapper = styled.div`
  .leaflet-container {
    background-color: #AAD3DF;
  }
`
class PJMap extends React.Component {
  componentDidMount = () => {
    const gMap = new google.maps.Map(this.mapEl, {
      zoom: 3,
      center: { lat: 45, lng: 0 },
    })

    gMap.data.addGeoJson(worldGeoJson)

    // gMap.addListener('bounds_changed', this.checkBounds)
    // gMap.addListener('zoom_changed', this.checkZoom)
  }

  // checkZoom = (passedGMap) => {
  //   const { gMap } = this
  //   const uppermostLat = gMap.getBounds().getNorthEast().lat()
  //   const lowermostLat = gMap.getBounds().getSouthWest().lat()

  //   if (uppermostLat - lowermostLat > 170)
  //     gMap.setZoom(gMap.getZoom() + 1)
  // }

  // checkBounds = () => {
  //   const { gMap } = this
  //   const uppermostLat = gMap.getBounds().getNorthEast().lat()
  //   const lowermostLat = gMap.getBounds().getSouthWest().lat()
  //   const isTooHigh = uppermostLat > 85
  //   const isTooLow = lowermostLat < -85

  //   if (isTooHigh || isTooLow) {
  //     const center = gMap.getCenter()
  //     const lat = center.lat()
  //     const lng = center.lng()

  //     const correctLat = lat - (isTooHigh ? uppermostLat - 85 : lowermostLat + 85)

  //     gMap.setCenter(new google.maps.LatLng(correctLat, lng))
  //   }
  // }

  mapRef = (mapEl) => {
    this.mapEl = mapEl
  }

  render = () => (
    <Wrapper className='h-100'>
      <div ref={this.mapRef} className='h-100 bg-white' />
    </Wrapper>
  )
}

export default PJMap
