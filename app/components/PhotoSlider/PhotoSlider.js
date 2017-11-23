import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'

import { createJournalPhotoUrl } from 'constants/'

const carouselOpts = {
  showArrows: true,
}

const Container = styled.div`
  .legend {
    border-radius: 0 !important;
    left: 0 !important;
    margin-left: 0 !important;
    width: 100% !important;
  }

  .slider-wrapper {
    background-color: #111;
  }

  .slider {
    align-items: center;
  }

  .slide {
    background-color: transparent;
  }
`

// db w-100 h-auto

const PhotoSlider = ({ photos }) => (
  <Container>
    <Carousel {...carouselOpts}>
      {
        photos.map(photo => (
          <div key={photo.get('id')} data-test='photo-set'>
            <img
              src={createJournalPhotoUrl(photo.get('path'))}
              alt={photo.get('description') || ''}
              className=''
              data-test='photo'
            />
            {
              photo.get('description') &&
              <p className='legend' data-test='description'>
                {photo.get('description')}
              </p>
            }
          </div>
        )).toJS()
      }
    </Carousel>
  </Container>
)

PhotoSlider.propTypes = {
  photos: IPropTypes.listOf(
    IPropTypes.contains({
      id: PropTypes.string.isRequired,
      path: PropTypes.string,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
}

export default PhotoSlider
