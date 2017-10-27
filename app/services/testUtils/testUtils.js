import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import td from 'testdouble'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import * as Iu from 'services/immutablejsUtils'

export const makeTestSetup = (args1 = {}) => {
  const {
    defaultHooks = {},
    defaultProps,
    defaultDeps,
    tools = [],
    Component,
    shell,
  } = args1

  let FinalComponent

  if (!shell)
    FinalComponent = Component

  return (args2 = {}) => {
    if (tools.includes('td')) {
      td.reset()

      if (defaultHooks.afterTdReset)
        defaultHooks.afterTdReset()
    }

    const {
      hooks = {},
      props,
      deps,
      useMount,
    } = args2

    const finalProps = Iu.smartMergeDeep(defaultProps, props)

    if (shell) {
      const finalDeps = Iu.smartMergeDeep(defaultDeps, deps)

      FinalComponent = shell(finalDeps)
    }

    const theNode = (<FinalComponent {...finalProps} />)

    if (hooks.beforeRender)
      hooks.beforeRender()

    if (useMount) {
      if (tools.includes('mui'))
        return mount(theNode, {
          context: { muiTheme: getMuiTheme() },
          childContextTypes: { muiTheme: PropTypes.object },
        })

      return mount(theNode)
    }

    return shallow(theNode)
  }
}
