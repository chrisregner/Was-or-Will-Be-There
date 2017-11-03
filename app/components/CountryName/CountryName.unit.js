import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import isSubset from 'is-subset'

import * as TU from 'services/testUtils'
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

const setup = TU.makeTestSetup({
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

test('CountryName | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('CountryName | it should call fetch()', () => {
  setup()

  td.verify(fake.requestPromise(), { times: 1, ignoreExtraArgs: true })
})

test('CountryName | if fetch is still loading, should show loader', () => {
  const wrapper = setup()
  const loaderWrpr = () => wrapper.find('[data-name="loader"]')

  const actual = loaderWrpr().exists()

  assert.isTrue(actual)
})

test('CountryName | if fetch is resolved, should show the country name', () => {
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

    assert.isTrue(actual)
  }

  testWithVars('ph', 'Philippines')
  testWithVars('us', 'United States of America')
  testWithVars('jp', 'Japan')
})

// We have issues related with SVG, material-ui, and JSDOM. Watch out on these for he meanwhile:
//   https://github.com/callemall/material-ui/issues/8643
//   https://github.com/tmpvar/jsdom/pull/2011
test.skip('CountryName | if fetch is rejected, should show the country code', () => {
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

    assert.isTrue(actual)
  }

  testWithVars('ph')
  testWithVars('us')
  testWithVars('jp')
})

test.skip('CountryName | if fetch is rejected, it should show an info button')
test.skip('CountryName | if fetch is rejected and info button is clicked, it toggle the info popover')
test.skip('CountryName | if fetch is rejected, it should NOT fire the click handler twice on first and subsequent key presses of enter and space key')
test.skip('CountryName | if fetch is rejected, it should render an info popover containing the error message')

test('CountryName | it should render the correct country flag', () => {
  const testWithVar = (countryId) => {
    const props = { countryId }
    const wrapper = setup({ props })
    const countryFlagWrpr = wrapper.find(`[src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/${countryId}.svg"]`)

    const actual = countryFlagWrpr.exists()

    assert.isTrue(actual)
  }

  testWithVar('PH')
  testWithVar('US')
  testWithVar('JP')
})

test('CountryName | if wrapper element is specified, it should use it', () => {
  const testWithVar = (wrapperEl) => {
    const props = { wrapperEl }
    const wrapper = setup({ props })

    const actual = wrapper.is(wrapperEl)

    assert.isTrue(actual)
  }

  testWithVar('div')
  testWithVar('h1')
  testWithVar('p')
})

test('CountryName | it should pass the other props to the wrapper', () => {
  const props = {
    id: 'sample-id',
    'data-foo': 'bar',
  }
  const wrapper = setup({ props })
  const computedProps = wrapper.props()

  const actual = isSubset(computedProps, props)

  assert.isTrue(actual)
})
