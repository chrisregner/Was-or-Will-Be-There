import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'

import { uiGetters } from 'state'

const BarePaperWithHeight = ({ height, ghostHeight, children }) => (
  <div className='paper-with-height-ghost' style={{ height: ghostHeight }}>
    <Paper className='paper-with-height-paper' style={{ height }}>
      {children}
    </Paper>
  </div>
)

BarePaperWithHeight.propTypes = {
  height: PropTypes.number.isRequired,
  ghostHeight: PropTypes.number.isRequired,
  children: PropTypes.node,
}

const mapStateToProps = state => ({
  height: uiGetters.getHighestHeight(state),
  ghostHeight: uiGetters.getHighestGhostHeight(state),
})

const PaperWithHeight = connect(mapStateToProps)(BarePaperWithHeight)

export { BarePaperWithHeight }
export default PaperWithHeight
