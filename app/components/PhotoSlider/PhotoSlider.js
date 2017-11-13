import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'
import Slider from 'react-slick'
import I from 'immutable'

import { blueGrey900 } from 'material-ui/styles/colors'

import { createJournalPhotoUrl } from 'constants/'

const sliderOpts = {
  adaptiveHeight: true,
  arrows: false,
  dots: true
}

const Container = styled.div`
  .slick-dots button {
    padding-top: 16px !important;
  }
`

const PhotoSlider = ({ photos }) => (
  <Container className='pb4'>
    <Slider {...sliderOpts}>
      {
        photos.map((photo) => (
          <div style={{ backgroundColor: blueGrey900 }} key={photo.get('id')} data-test='photo-set'>
            <img
              src={createJournalPhotoUrl(photo.get('path'))}
              alt={photo.get('description') || ''}
              className='db w-100 h-auto'
              data-test='photo'
            />
            {
              photo.get('description')
              && <p className='pa3 ma0 normal tc' data-test='description'>
                  {photo.get('description')}
                </p>
            }
          </div>
        )).toJS()
      }
    </Slider>
  </Container>
)

PhotoSlider.propTypes = {
  photos: IPropTypes.listOf(
    IPropTypes.contains({
      id: PropTypes.string.isRequired,
      path: PropTypes.string,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default PhotoSlider
