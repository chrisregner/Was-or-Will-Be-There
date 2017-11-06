import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import CloseIcon from 'material-ui/svg-icons/content/clear'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import { createJournalThumbUrl, createJournalPhotoUrl } from 'constants/'

class PhotoFieldSet extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleDeletePhoto: PropTypes.func.isRequired,
    handleSetPhotoDesc: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
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

  render = () => {
    const { path, description } = this.props
    const { fullSizedPhotoVisiblity } = this.state

    return (
      <div>
        <div
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.54)' }}
          className={c(
            'photo-field-set-photo-wrapper fixed absolute--fill z-1 items-center',
            (fullSizedPhotoVisiblity === 'clean') ? 'dn' : 'flex',
            (fullSizedPhotoVisiblity === true) && 'animated fadeIn',
            !fullSizedPhotoVisiblity && 'animated fadeOut',
          )}
        >
          <Paper className='relative' rounded={false} >
            <div className='absolute top-1 right-1'>
              <IconButton
                onClick={this.handleHideFullSizedPhoto}
                className='photo-field-set-hide-full-sized-photo'
                tooltip='SVG Icon'
              >
                <CloseIcon />
              </IconButton>
            </div>
            <img
              className='photo-field-set-photo db w-100'
              src={createJournalPhotoUrl(path)}
              alt={description}
            />
          </Paper>
        </div>
        <div className='flex items-center'>
          <div className='w-20 tc' style={{ maxWidth: 60 }}>
            <img
              className='photo-field-set-thumb-photo db w-100 h-auto pointer'
              onClick={this.handleShowFullSizedPhoto}
              src={createJournalThumbUrl(path)}
              alt={description}
            />
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
            />
          </div>
          <div>
            <IconButton
              onClick={this.handleDeletePhoto}
              className='photo-field-set-delete-photo-btn'
              tooltip='SVG Icon'
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoFieldSet
