import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import countryNames from 'constants/countryNames'
import { createFlagUrl } from 'constants/'
import ImageLoader from 'components/ImageLoader'
import Spinner from 'components/Spinner'

const defaultClassNames = {
  flag: 'country-name-and-flag-default',
  flagWrapper: 'country-name-and-flag-default w2pt5 mr2',
  countryName: 'country-name-and-flag-default pl1 lh-title fw5',
}

const CountryNameAndFlag = ({ countryId, customClassNames }) => (
  <div className='flex items-center'>
    <ImageLoader
      className='country-name-and-flag-flag-wrapper country-name-and-flag-flag'
      src={createFlagUrl(countryId)}
      loaded={(
        <div className='animated fadeIn'>
          <Paper
            className={`country-name-and-flag-flag-wrapper ' ${
              (customClassNames && customClassNames.flagWrapper) ||
              defaultClassNames.flagWrapper
            }`}
            rounded={false}
          >
            <img
              className={`country-name-and-flag-flag db w-100 h-auto f7 normal ${
                (customClassNames && customClassNames.flag) ||
                defaultClassNames.flagWrapper
              }`}
              src={createFlagUrl(countryId)}
              alt={`${countryNames[countryId]} flag`}
            />
          </Paper>
        </div>
      )}
      loader={(
        <div className={(customClassNames && customClassNames.loader)}>
          <Spinner />
        </div>
      )}
    />
    <div
      className={`country-name-and-flag-country-name flex-grow-1 truncate ${
        (customClassNames && customClassNames.countryName) ||
        defaultClassNames.countryName
      }`}
    >
      {countryNames[countryId]}
    </div>
  </div>
)

CountryNameAndFlag.propTypes = {
  countryId: PropTypes.string.isRequired,
  customClassNames: PropTypes.shape({
    flagWrapper: PropTypes.string,
    countryName: PropTypes.string,
    loader: PropTypes.string,
  }),
}

export default CountryNameAndFlag
