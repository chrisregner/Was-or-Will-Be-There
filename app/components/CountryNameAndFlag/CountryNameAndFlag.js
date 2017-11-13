import React from 'react'
import PropTypes from 'prop-types'
import countryNames from 'constants/countryNames'
import { createFlagUrl } from 'constants/'

import Paper from 'material-ui/Paper'

const defaultClassNames = {
  flag: 'country-name-and-flag-default',
  flagWrapper: 'country-name-and-flag-default w2pt5 mr1',
  countryName: 'country-name-and-flag-default pl2 lh-title fw5',
}

const CountryNameAndFlag = ({ countryId, customClassNames }) => (
  <div className='flex items-center'>
    <Paper
      className={`country-name-and-flag-flag-wrapper ${
        (customClassNames && customClassNames.flagWrapper) ||
        defaultClassNames.flagWrapper
      }`}
      zDepth={2}
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
    <div
      className={`country-name-and-flag-country-name flex-grow-1 ${
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
  }),
}

export default CountryNameAndFlag
