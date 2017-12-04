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

  checkIfImageHasLoaded = () => {
    if (this.imgEl.complete && !this.state.hasLoaded)
      this.setState({ hasLoaded: true })
    else if (!this.imgEl.complete)
      this.imgEl.addEventListener('load', () => {
        this.setState({ hasLoaded: true })
      })
  }

  componentDidMount = this.checkIfImageHasLoaded
  componentDidUpdate = this.checkIfImageHasLoaded
  componentWillUpdate = nextProps =>
    nextProps.src !== this.props.src &&
    this.setState({ hasLoaded: false })

  imgRef = (img) => {
    this.imgEl = img
  }

  render = () => {
    const { src, loaded, loader } = this.props
    const { hasLoaded } = this.state

    return (
      <div>
        {hasLoaded ? loaded : loader}
        <img src={src} ref={(el) => { this.imgEl = el }} className='dn' role='presentation' />
      </div>
    )
  }
}

export default ImageLoader
