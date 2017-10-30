import test from 'tape'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import * as FU from 'services/functionalUtils'
import { BareNotifSnackbar as NotifSnackbar } from './NotifSnackbar'

const defProps = {
  open: false,
  message: '',
  hideSnackbar: td.func()
}

const setup = TU.makeTestSetup({
  Component: NotifSnackbar,
  defaultProps: defProps,
})

test('NotifSnackbar | it should render without error', t => {
  const wrapper = setup()

  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test('NotifSnackbar | it should pass the props correctly', t => {
  const hideSnackbar = () => {}
  const props = {
    open: true,
    message: 'Some snackbar message',
    hideSnackbar
  }
  const wrapper = setup({ props })
  const computedProps = wrapper.props()
  const expectedProps = {
    open: true,
    message: 'Some snackbar message',
    onRequestClose: hideSnackbar,
    onActionTouchTap: hideSnackbar,
  }

  const actual = Object.keys(computedProps).length && FU.isObjSubset(computedProps, expectedProps)
  const expected = true

  t.is(actual, expected)
  t.end()
})
