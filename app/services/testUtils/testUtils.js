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
    defaultEnzymeOpts,
    tools = [],
    Component: DefaultComponent,
    shell,
  } = args1

  return (args2 = {}) => {
    const {
      hooks = {},
      props,
      deps,
      useMount,
      Component,
      childNode,
    } = args2

    if (defaultHooks.reset)
      defaultHooks.reset()

    if (hooks.afterReset)
      hooks.afterReset()

    if (tools.includes('td')) {
      td.reset()

      if (defaultHooks.afterTdReset)
        defaultHooks.afterTdReset()

      if (hooks.afterTdReset)
        hooks.afterTdReset()
    }

    let FinalComponent

    if (shell) {
      const finalDeps = Iu.smartMergeDeep(defaultDeps, deps)

      FinalComponent = shell(finalDeps)
    } else {
      FinalComponent = Component || DefaultComponent
    }

    const finalProps = Iu.smartMergeDeep(defaultProps, props)
    const theNode = (
      <FinalComponent {...finalProps}>
        {childNode}
      </FinalComponent>
    )

    if (hooks.beforeRender)
      hooks.beforeRender()

    if (useMount) {
      if (tools.includes('mui'))
        return mount(theNode, {
          context: { muiTheme: getMuiTheme() },
          childContextTypes: { muiTheme: PropTypes.object },
        })

      return mount(theNode, defaultEnzymeOpts)
    }

    return shallow(theNode, defaultEnzymeOpts)
  }
}
