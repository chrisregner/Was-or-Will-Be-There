import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'

import overviewGetter from 'state/shared/overviewGetter'
import withHeightWatcher from 'containers/withHeightWatcher'

const BareWorldOverview = ({ overview }) => (
  <div>What to do...</div>
)

BareWorldOverview.propTypes = {
  overview: IPropTypes.contains({
    totalPlans: PropTypes.number.isRequired,
    totalJournals: PropTypes.number.isRequired,
    totalCountries: PropTypes.number.isRequired,
    countriesInfo: IPropTypes.listOf(
      IPropTypes.contains({
        id: PropTypes.string.isRequired,
        hasPlan: PropTypes.bool.isRequired,
        hasJournal: PropTypes.bool.isRequired
      })
    ),
  }).isRequired
}

const mapStateToProps = (state) => ({
  overview: overviewGetter(state),
})

const WorldOverview = withHeightWatcher(connect(mapStateToProps)(BareWorldOverview))

export { BareWorldOverview }
export default WorldOverview