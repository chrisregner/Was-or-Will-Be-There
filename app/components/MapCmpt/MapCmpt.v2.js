import React from 'react'
import styled from 'styled-components'
import L from 'leaflet'
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
    const lMap = L.map(this.mapEl, {
      center: [0, 0],
      zoom: 2,
      minZoom: 4,
      maxZoom: 12,
      maxBoundsViscosity: 1,
      maxBounds: [[90, -180], [-90, 180]],
      // noWrap: true,
      layers: [
        L.tileLayer('https://api.mapbox.com/styles/v1/chrisregner/cja3pmpre1wqj2spkkpy2mijn/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hyaXNyZWduZXIiLCJhIjoiY2o3NzFvMngwMTF5ejJ3cDM4MzI0OWJ0ciJ9.i91qADEbokI_EM_IWqKc7w', /*{ noWrap: true }*/),
        // L.tileLayer('https://api.mapbox.com/styles/v1/chrisregner/cja3nkq081u712snu0r9unmtu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hyaXNyZWduZXIiLCJhIjoiY2o3NzFvMngwMTF5ejJ3cDM4MzI0OWJ0ciJ9.i91qADEbokI_EM_IWqKc7w', { noWrap: true }),
      ]
    })

    const beneathTilePane = lMap.createPane('beneathTilePane')
    beneathTilePane.style.zIndex = 100

    const lGeoJson = L.geoJson(worldGeoJson, {
      pane: beneathTilePane,
      onEachFeature: (feature, layer) => {
        layer.on({
          click: () => { console.log(feature, layer) }
        })
      }
    }).addTo(lMap)
  }

  mapRef = (mapEl) => {
    this.mapEl = mapEl
  }

  render = () => {
    return (
      <Wrapper className='h-100'>
        <div ref={this.mapRef} className='h-100 bg-white' />
      </Wrapper>
    )
  }
}

export default PJMap
