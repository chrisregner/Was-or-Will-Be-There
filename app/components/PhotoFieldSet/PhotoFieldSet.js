import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import TextField from 'material-ui/TextField'
import CloseIcon from 'material-ui/svg-icons/content/clear'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import RestoreIcon from 'material-ui/svg-icons/action/restore'

import { createJournalThumbUrl, createJournalPhotoUrl } from 'constants/'

class PhotoFieldSet extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleDeletePhoto: PropTypes.func.isRequired,
    handleRestorePhoto: PropTypes.func.isRequired,
    handleSetPhotoDesc: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
  }

  static defaultProps = {
    description: '',
  }

  state = {
    fullSizedPhotoVisiblity: 'clean',
  }

  handleShowFullSizedPhoto = () => {
    this.setState({ fullSizedPhotoVisiblity: true })
  }

  handleHideFullSizedPhoto = () => {
    this.setState({ fullSizedPhotoVisiblity: false })
  }

  handleSetPhotoDesc = (ev, newDesc) => {
    ev.preventDefault()
    const { handleSetPhotoDesc, id } = this.props
    handleSetPhotoDesc(id, newDesc)
  }

  handleDeletePhoto = () => {
    const { handleDeletePhoto, id } = this.props
    handleDeletePhoto(id)
  }

  handleRestorePhoto = () => {
    const { handleRestorePhoto, id } = this.props
    handleRestorePhoto(id)
  }

  render = () => {
    const { path, description, isDeleted } = this.props
    const { fullSizedPhotoVisiblity } = this.state

    return (
      <div>
        {/* The full-sized photo */}
        <div
          style={{
            top: 48,
            backgroundColor: 'rgba(0, 0, 0, 0.54)',
          }}
          className={c(
            'photo-field-set-photo-wrapper fixed right-0 left-0 bottom-0 z-2 items-center justify-center content-center',
            (fullSizedPhotoVisiblity === 'clean') ? 'dn' : 'flex',
            (fullSizedPhotoVisiblity === true) && 'animated fadeIn',
            !fullSizedPhotoVisiblity && 'animated fadeOut',
          )}
        >
          <Paper className='relative' rounded={false} style={{ maxHeight: '100%' }}>
            <img
              className='photo-field-set-photo db h-auto'
              src={createJournalPhotoUrl(path)}
              alt={description}
            />
            <div style={{ top: 8, right: 8 }} className='absolute'>
              <FloatingActionButton
                onClick={this.handleHideFullSizedPhoto}
                className='photo-field-set-hide-full-sized-photo'
                mini
                tooltip='Hide full sized photo'
                backgroundColor='rgba(0, 0, 0, 0.54)'
                iconstyle={{ color: '#fff' }}
              >
                <CloseIcon />
              </FloatingActionButton>
            </div>
          </Paper>
        </div>

        {/* The field set */}
        <div className='flex items-center'>
          <div className='w-20 tc relative' style={{ maxWidth: 60 }}>
            <img
              className='photo-field-set-thumb-photo db w-100 h-auto pointer'
              onClick={this.handleShowFullSizedPhoto}
              src={createJournalThumbUrl(path)}
              alt={description}
            />
            {
              isDeleted &&
              <div
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.54)' }}
                className={'photo-field-set-thumb-photo-overlay absolute absolute--fill z-1'}
              />
            }
          </div>

          <div className='relative flex-grow-1 pl2' style={{ top: -4 }}>
            <TextField
              className='photo-field-set-description-field w-100--i'
              floatingLabelText='Description'
              floatingLabelFixed
              onChange={this.handleSetPhotoDesc}
              multiLine
              rowsMax={4}
              value={description}
              disabled={!!isDeleted}
            />
          </div>

          <div>
            {
              isDeleted
                ? <IconButton
                  onClick={this.handleRestorePhoto}
                  className='photo-field-set-restore-photo-btn'
                  tooltip='restore photo'
                  tooltipPosition='bottom-left'
                >
                  <RestoreIcon />
                </IconButton>
                : <IconButton
                  onClick={this.handleDeletePhoto}
                  className='photo-field-set-delete-photo-btn'
                  tooltip='delete photo'
                  tooltipPosition='bottom-left'
                >
                  <DeleteIcon />
                </IconButton>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoFieldSet
