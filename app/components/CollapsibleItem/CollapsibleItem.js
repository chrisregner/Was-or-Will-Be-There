import React from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
import formatDate from 'date-fns/format'
import diffInCalendarDays from 'date-fns/difference_in_calendar_days'

import muiThemeable from 'material-ui/styles/muiThemeable'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import InfoIcon from 'material-ui/svg-icons/action/info'
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import LessIcon from 'material-ui/svg-icons/navigation/expand-less'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Collapse from 'material-ui-next/transitions/Collapse'

import PhotoSlider from 'components/PhotoSlider'
import NonALink from 'components/NonALink'

const preventDefault = e => e.preventDefault()

class BareCollapsibleItem extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['journal', 'plan']).isRequired,
    data: IPropTypes.contains({
      countryId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      copy: PropTypes.string,
      departure: PropTypes.instanceOf(Date),
      homecoming: PropTypes.instanceOf(Date),
      photos: IPropTypes.listOf(IPropTypes.contains({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        description: PropTypes.string,
      })),
    }).isRequired,
    muiTheme: PropTypes.shape({
      palette: PropTypes.shape({
        primary1Color: PropTypes.string.isRequired,
        primary2Color: PropTypes.string.isRequired,
        tertiary2Color: PropTypes.string.isRequired,
        tertiary3Color: PropTypes.string.isRequired,
        secondaryTextColor: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  state = {
    isExpanded: false,
  }

  handleSummaryClick = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }))
  }

  titleRef = (titleEl) => {
    if (titleEl)
      this.isTitleTruncated = titleEl.scrollWidth > titleEl.clientWidth
  }

  getTimeAlert = () => {
    const { data } = this.props

    const departureFromNow = data.get('departure') &&
      diffInCalendarDays(data.get('departure'), new Date())
    const homecomingFromNow = data.get('homecoming') &&
      diffInCalendarDays(data.get('homecoming'), new Date())

    /* eslint-disable no-unreachable */
    switch (true) {
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
    /* eslint-enable no-unreachable */
    }
  }

  render = () => {
    const { type, data, isSelected } = this.props
    const { palette } = this.props.muiTheme
    const departure = data.get('departure')
    const homecoming = data.get('homecoming')
    const timeAlert = this.getTimeAlert()
    const iconStyle = isSelected ? { color: '#fff' } : {}

    return (
      <div>
        <ListItem
          data-test='summary'
          onClick={this.handleSummaryClick}
          innerDivStyle={{
            paddingRight: 12,
            ...(
              isSelected
                ? {
                  backgroundColor: palette.primary1Color,
                  color: '#fff',
                }
                : {}
            ),
          }}
        >
          <div className='flex items-center'>
            {
              (timeAlert && type === 'plan') &&
              <div>
                <IconButton
                  onClick={preventDefault}
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
                      : palette.primary2Color,
                    ...iconStyle,
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
                (departure || homecoming) &&
                <div
                  data-test='dateRange'
                  className='f6'
                  style={{ color: isSelected ? '#fff' : palette.secondaryTextColor }}
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
              {this.state.isExpanded ? <LessIcon style={iconStyle} /> : <MoreIcon style={iconStyle} />}
            </div>
          </div>

          {isSelected &&
            <div
              className='absolute top-0 right-0 bottom-0'
              style={{
                backgroundColor: '#FF4081',
                width: 2,
              }}
            />
          }
        </ListItem>
        <Collapse data-test='details' in={this.state.isExpanded}>
          <div className='bg-black-10'>
            {
              (timeAlert && type === 'plan') &&
              <div className='pt3 ph3 f6 tc'>
                {
                  timeAlert === 'journalize'
                    ? <span style={{ color: palette.tertiary3Color }}>
                    You must already be home. Click{' '}
                      <Link
                        tabIndex={this.state.isExpanded ? 0 : -1}
                        data-test='timeAlert'
                        to={`/countries/${data.get('countryId')}/${type}s/${data.get('id')}/journalize`}
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

            {
              this.isTitleTruncated &&
              <div className='pt3 ph3 w-100 cg'>
                <div className='f6 pb2' style={{ color: palette.secondaryTextColor }}>
                  Full title:
                </div>
                <div data-test='fullTitle' className='f5 lh-title'>
                  {data.get('title')}
                </div>
              </div>
            }

            {
              data.get('photos') && data.get('photos').size > 0 &&
              <PhotoSlider data-test='photoSlider' photos={data.get('photos')} />
            }

            {
              data.get('copy') &&
              <div className='pt3 ph3'>
                <div
                  data-test='copyLabel'
                  className='f6 pb2'
                  style={{ color: palette.secondaryTextColor }}
                >
                  {type === 'plan' && 'Notes'}
                  {type === 'journal' && 'Story'}
                </div>
                <div data-test='copy' className='f5 lh-title'>
                  {data.get('copy')}
                </div>
              </div>
            }

            <div className='pa3 tr'>
              <NonALink
                data-test='editLink'
                to={`/countries/${data.get('countryId')}/${type}s/${data.get('id')}`}
                className='no-underline'
              >
                <RaisedButton tabIndex={this.state.isExpanded ? 0 : -1} label='edit' icon={<EditIcon />} />
              </NonALink>
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
