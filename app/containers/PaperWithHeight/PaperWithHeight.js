import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'

import { uiGetters } from 'state'

const BarePaperWithHeight = ({ height, children }) => (
  <Paper style={{ height }}>
    {children}
  </Paper>
)

BarePaperWithHeight.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
}

const mapStateToProps = state => ({
  height: uiGetters.getHighestHeight(state),
})

const PaperWithHeight = connect(mapStateToProps)(BarePaperWithHeight)

export { BarePaperWithHeight }
export default PaperWithHeight
