import { test, after } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { ScrollOnRouteChangeShell } from './ScrollOnRouteChange'

const defProps = {
  location: {
    pathname: '/default/path',
  }
}

const defDeps = {
  smoothscroll: td.func()
}

const setup = TU.makeTestSetup({
  shell: ScrollOnRouteChangeShell,
  defaultProps: defProps,
  defaultDeps: defDeps,
  tools: ['td']
})

after(() => {
  delete global.window.scrollTo
})

test('components.ScrollOnRouteChange | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.ScrollOnRouteChange | when props changes with new pathname, it should update', () => {
  const props = {
    location: {
      pathname: '/new/path'
    }
  }
  const wrapper = setup()
  const fakeComponentDidUpdate = td.replace(wrapper.instance(), 'componentDidUpdate')

  wrapper.setProps(props)
  td.verify(fakeComponentDidUpdate(), { times: 1, ignoreExtraArgs: true })
})

test('components.ScrollOnRouteChange | when props changes with new pathname, it should scroll to top', () => {
  const props = {
    location: {
      pathname: '/new/path'
    }
  }
  setup().setProps(props)
  td.verify(defDeps.smoothscroll(), { times: 1, ignoreExtraArgs: true })
})

test('components.ScrollOnRouteChange | when props changes with the same pathname, it should NOT update', () => {
  const props = {
    location: {
      pathname: '/default/path'
    }
  }
  const wrapper = setup()
  const fakeComponentDidUpdate = td.replace(wrapper.instance(), 'componentDidUpdate')

  wrapper.setProps(props)
  td.verify(fakeComponentDidUpdate(), { times: 0, ignoreExtraArgs: true })
})

test('components.ScrollOnRouteChange | when props changes with the same pathname, it should NOT scroll to top', () => {
  const props = {
    location: {
      pathname: '/default/path'
    }
  }
  setup().setProps(props)
  td.verify(defDeps.smoothscroll(), { times: 0, ignoreExtraArgs: true })
})
