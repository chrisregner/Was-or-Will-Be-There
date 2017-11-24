import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import td from 'testdouble'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import * as IU from 'services/immutablejsUtils'

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
      const finalDeps = IU.smartMergeDeep(defaultDeps, deps)

      FinalComponent = shell(finalDeps)
    } else {
      FinalComponent = Component || DefaultComponent
    }

    const finalProps = IU.smartMergeDeep(defaultProps, props)

    const theNode = childNode
      ? (
          <FinalComponent {...finalProps}>
            {childNode}
          </FinalComponent>
        )
      : (<FinalComponent {...finalProps} />)

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

export const getArgs = (tdFn, nthCall = 0) => td.explain(tdFn).calls[nthCall].args
export const prettyImmutableLog = (immutableObj) => { console.log(JSON.stringify(immutableObj, null, 2)) } // eslint-disable-line no-console
