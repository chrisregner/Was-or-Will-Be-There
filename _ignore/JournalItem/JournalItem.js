import React from 'react'
import formatDate from 'date-fns/format'
import IPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ListItem } from 'material-ui/List'

const smartFormatDate = date =>
  date
    ? formatDate(date, 'MM/DD/YY')
    : '(TBD)'

const createDateRange = journal =>
  (journal.get('homecoming') || journal.get('departure')) &&
  `${smartFormatDate(journal.get('departure'))} – ${smartFormatDate(journal.get('homecoming'))}`

const JournalItem = ({ countryId, journal }) => (
  <Link
    className='journal-item no-underline'
    to={`/countries/${countryId}/journals/${journal.get('id')}`}
  >
    <ListItem className='journal-item-name journal-item-date-range'>
      <div className='flex items-center w-100'>
        <div className='flex-grow-1 pr2 truncate'>
          {journal.get('title')}
          {
            (journal.get('homecoming') || journal.get('departure')) &&
            <div className='pt1 f6 gray'>{createDateRange(journal)}</div>
          }
        </div>
      </div>
    </ListItem>
  </Link>
)

JournalItem.propTypes = {
  countryId: PropTypes.string.isRequired,
  journal: IPropTypes.contains({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    departure: PropTypes.instanceOf(Date),
    homecoming: PropTypes.instanceOf(Date),
  }).isRequired,
}

export default JournalItem
