import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import I from 'immutable'
import { Link } from 'react-router-dom'
import formatDate from 'date-fns/format'
import diffInCalendarDays from 'date-fns/difference_in_calendar_days'

import muiThemeable from 'material-ui/styles/muiThemeable'
import { ListItem } from 'material-ui/List'
import List from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import InfoIcon from 'material-ui/svg-icons/action/info'
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import LessIcon from 'material-ui/svg-icons/navigation/expand-less'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Collapse from 'material-ui-next/transitions/Collapse'

import PhotoSlider from 'components/PhotoSlider'

class BareCollapsibleItem extends React.Component {
  static propTypes = {
    countryId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['journal', 'plan']).isRequired,
    data: IPropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      copy: PropTypes.string,
      departure: PropTypes.instanceOf(Date),
      homecoming: PropTypes.instanceOf(Date),
      photos: IPropTypes.listOf(IPropTypes.contains({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        description: PropTypes.string,
      }))
    }).isRequired,
    muiTheme: PropTypes.shape({
      palette: PropTypes.shape({
        primary2Color: PropTypes.string,
        tertiary2Color: PropTypes.string,
        tertiary3Color: PropTypes.string,
        secondaryTextColor: PropTypes.string,
      })
    })
  }

  state = {
    isExpanded: false
  }

  handleSummaryClick = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  titleRef = (titleEl) => {
    this.isTitleTruncated = titleEl.scrollWidth > titleEl.clientWidth
  }

  getTimeAlert = () => {
    const { data } = this.props

    const departureFromNow = data.get('departure')
      && diffInCalendarDays(data.get('departure'), new Date())
    const homecomingFromNow = data.get('homecoming')
      && diffInCalendarDays(data.get('homecoming'), new Date())

    switch(true) {
      case homecomingFromNow < 0:
        return 'journalize'
        break
      case departureFromNow === 0:
        return 'today'
        break
      case departureFromNow === 1:
        return 'tomorrow'
        break
      case departureFromNow >= 2 && departureFromNow <= 30:
        return `in ${departureFromNow} days`
        break
      default:
        return null
        break
    }
  }

  render = () => {
    const { type, countryId, data } = this.props
    const { palette } = this.props.muiTheme
    const departure = data.get('departure')
    const homecoming = data.get('homecoming')
    const timeAlert = this.getTimeAlert()

    return (
      <div>
        <ListItem
          data-test='summary'
          onClick={this.handleSummaryClick}
          innerDivStyle={{ paddingRight: 12 }}
        >
          <div className='flex items-center'>
            {
              (timeAlert && type === 'plan')
              && <div>
                <IconButton
                  data-test='timeAlert'
                  tooltip={
                    timeAlert === 'journalize'
                      ? 'You must already be home, you can now journalize!'
                      : `You will be leaving ${timeAlert}`
                  }
                  tooltipPosition='top-right'
                  style={{ marginLeft: -16 }}
                  iconStyle={{
                    color: timeAlert === 'journalize'
                      ? palette.tertiary2Color
                      : palette.primary2Color
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </div>
            }

            <div className='flex-grow-1 truncate'>
              <div
                data-test='title'
                ref={this.titleRef}
                title={data.get('title')}
                className='pb2 truncate'
              >
                {data.get('title')}
              </div>

              {
                /* Data Range */
                (departure || homecoming)
                && <div
                    data-test='dateRange'
                    className='f6'
                    style={{ color: palette.secondaryTextColor }}
                  >
                    {`${
                      departure ? formatDate(departure, 'MM/DD/YY') : '(TBD)'
                    } – ${
                      homecoming ? formatDate(homecoming, 'MM/DD/YY') : '(TBD)'
                    }`}
                  </div>
              }
            </div>
            <div>
              {this.state.isExpanded ? <LessIcon /> : <MoreIcon />}
            </div>
          </div>
        </ListItem>
        <Collapse data-test='details' in={this.state.isExpanded}>
          <div className='pv3'>
            {
              (timeAlert && type === 'plan')
              && <div className='ph3 pb3 f6 tc'>
                {
                  timeAlert === 'journalize'
                  ? <span style={{ color: palette.tertiary3Color }}>
                    You must already be home. Click{' '}
                    <Link
                      data-test='timeAlert'
                      to={`/countries/${countryId}/${type}s/${data.get('id')}/journalize`}
                      className='color-inherit'
                    >
                      here
                    </Link>
                    {' '}to journalize and save memories from your journey!
                  </span>
                  : <span data-test='timeAlert' style={{ color: palette.primary2Color }}>
                    Don’t forget, you will be leaving {timeAlert}!
                  </span>
                }
              </div>
            }

            <div className='cf'>
              <Link
                data-test='editLink'
                to={`/countries/${countryId}/${type}s/${data.get('id')}`}
                className='flex items-center fr ph3 f5 no-underline'
              >
                <EditIcon style={{
                  marginTop: -2,
                  marginRight: 2,
                  width: 14,
                  height: 14,
                  color: palette.primary2Color
                }} /> <span className='f6' style={{ color: palette.primary2Color }}>Edit</span>
              </Link>

              {
                this.isTitleTruncated
                && <div className='ph3'>
                  <div className='f6 pb2' style={{ color: palette.secondaryTextColor }}>
                    Full title:
                  </div>
                  <div data-test='fullTitle' className='f5 lh-title pb3'>
                    {data.get('title')}
                  </div>
                </div>
              }

              {
                data.get('photos') && data.get('photos').size > 0
                && <PhotoSlider data-test='photoSlider' photos={data.get('photos')}/>
              }

              {
                data.get('copy')
                && <div className='ph3'>
                  <div
                    data-test='copyLabel'
                    className='f6 pb2'
                    style={{ color: palette.secondaryTextColor }}
                  >
                    {type === 'plan' && 'Notes'}
                    {type === 'journal' && 'Story'}
                  </div>
                  <div data-test='copy' className='f5 lh-title pb3'>
                    {data.get('copy')}
                  </div>
                </div>
              }
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

const CollapsibleItem = muiThemeable()(BareCollapsibleItem)

export { BareCollapsibleItem }
export default CollapsibleItem
