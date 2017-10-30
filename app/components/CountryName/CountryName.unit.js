import test from 'tape'
import td from 'testdouble'
import isSubset from 'is-subset'

import * as Tu from 'services/testUtils'
import { countryNameShell } from './CountryName'

const any = td.matchers.anything()
const fake = {
  requestPromise: td.func(),
  promise: {
    then: () => fake.promise,
    catch: () => fake.promise,
  },
}

const defaultProps = {
  countryId: '',
}

const defaultDeps = {
  requestPromise: fake.requestPromise,
}

const setup = Tu.makeTestSetup({
  defaultHooks: {
    afterTdReset: () => {
      td.when(fake.requestPromise(any))
        .thenReturn(fake.promise)
    },
  },
  shell: countryNameShell,
  tools: ['td', 'mui'],
  defaultProps,
  defaultDeps,
})

test('CountryName | it should render without error', (t) => {
  const wrapper = setup()
  const actual = wrapper.exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test('CountryName | it should call fetch()', (t) => {
  setup()

  td.verify(fake.requestPromise(), { times: 1, ignoreExtraArgs: true })
  t.end()
})

test('CountryName | if fetch is still loading, should show loader', (t) => {
  const wrapper = setup()
  const loaderWrpr = () => wrapper.find('[data-name="loader"]')

  const actual = loaderWrpr().exists()
  const expected = true

  t.is(actual, expected)
  t.end()
})

test('CountryName | if fetch is resolved, should show the country name', (t) => {
  t.plan(3)

  const testWithVars = (countryId, countryName) => {
    const props = { countryId }
    const wrapper = setup({
      props,
      hooks: {
        beforeRender: () => {
          td.when(fake.requestPromise(any))
            .thenResolve(`{"${countryId.toUpperCase()}":"${countryName}"}`)
        },
      },
    })

    const actual = wrapper.text().includes(countryName)
    const expected = true

    t.is(actual, expected)
  }

  testWithVars('ph', 'Philippines')
  testWithVars('us', 'United States of America')
  testWithVars('jp', 'Japan')
})

// We have issues related with SVG, material-ui, and JSDOM. Watch out on these for he meanwhile:
//   https://github.com/callemall/material-ui/issues/8643
//   https://github.com/tmpvar/jsdom/pull/2011
test.skip('CountryName | if fetch is rejected, should show the country code', (t) => {
  t.plan(3)

  const testWithVars = (countryId) => {
    const props = { countryId }
    const wrapper = setup({
      props,
      hooks: {
        beforeRender: () => {
          td.replace(console, 'error') // silence logs from the component
          td.when(fake.requestPromise(any))
            .thenReject()
        },
      },
    })

    const actual = wrapper.text().includes(countryId.toUpperCase())
    const expected = true

    t.is(actual, expected)
  }

  testWithVars('ph')
  testWithVars('us')
  testWithVars('jp')
})

test.skip('CountryName | if fetch is rejected, it should show an info button')
test.skip('CountryName | if fetch is rejected and info button is clicked, it toggle the info popover')
test.skip('CountryName | if fetch is rejected, it should NOT fire the click handler twice on first and subsequent key presses of enter and space key')
test.skip('CountryName | if fetch is rejected, it should render an info popover containing the error message')

test('CountryName | if wrapper element is specified, it should use it', (t) => {
  t.plan(3)

  const testWithVar = (wrapperEl) => {
    const props = { wrapperEl }
    const wrapper = setup({ props })

    const actual = wrapper.is(wrapperEl)
    const expected = true

    t.is(actual, expected)
  }

  testWithVar('div')
  testWithVar('h1')
  testWithVar('p')
})

test('CountryName | it should pass the other props to the wrapper', (t) => {
  const props = {
    id: 'sample-id',
    'data-foo': 'bar',
  }
  const wrapper = setup({ props })
  const computedProps = wrapper.props()

  const actual = isSubset(computedProps, props)
  const expected = true

  t.is(actual, expected)
  t.end()
})
