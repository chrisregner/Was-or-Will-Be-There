import React from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'

import { uiGetters } from 'state'

const mapStateToProps = (state) => ({
  height: uiGetters.getHighestHeight(state),
})

const BarePaperWithHeight = ({ height, children }) => (
  <Paper style={{ height }}>
    {children}
  </Paper>
)
const PaperWithHeight = connect(mapStateToProps)(BarePaperWithHeight)

export default PaperWithHeight
