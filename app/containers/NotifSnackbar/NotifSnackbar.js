import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hideSnackbar } from 'state/ui'
import { uiGetters } from 'state'

import Snackbar from 'material-ui/Snackbar'

const BareNotifSnackbar = ({ open, message, hideSnackbar }) => (
  <Snackbar
    className={'z-999'}
    open={open}
    message={message}
    onRequestClose={hideSnackbar}
    onActionTouchTap={hideSnackbar}
    action='Okay'
    autoHideDuration={4444000}
  />
)

BareNotifSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  hideSnackbar: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const snackbarInfo = uiGetters.getSnackbarInfo(state)

  return {
    open: snackbarInfo.get('isVisible'),
    message: snackbarInfo.get('message'),
  }
}

const mapDispatchToProps = dispatch => ({
  hideSnackbar: () => { dispatch(hideSnackbar()) },
})

const NotifSnackbar = connect(mapStateToProps, mapDispatchToProps)(BareNotifSnackbar)

export { BareNotifSnackbar }
export default NotifSnackbar
