import React from 'react'
import PropTypes from 'prop-types'

class ImageLoader extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    loader: PropTypes.node.isRequired,
    loaded: PropTypes.node.isRequired,
  }

  state = {
    hasLoaded: false,
  }

  componentDidMount = () => {
    if (this.img.complete)
      this.setState({ hasLoaded: true })
    else
      this.img.addEventListener('load', () => {
        this.setState({ hasLoaded: true })
      })
  }

  imgRef = (img) => {
    this.img = img
  }

  render = () => {
    const { src, loaded, loader } = this.props
    const { hasLoaded } = this.state

    return (
      <div>
        {hasLoaded ? loaded : loader}
        <img src={src} ref={this.imgRef} className='dn' role='presentation' />
      </div>
    )
  }
}

export default ImageLoader
