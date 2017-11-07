import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import isSubset from 'is-subset'

import * as TU from 'services/testUtils'
import { countryLoaderShell } from './CountryLoader'

const any = td.matchers.anything()

const fakePromise = {
  then: () => fakePromise,
  catch: () => fakePromise,
}

const defProps = {
  countryId: '',
  pathname: '',
  setNotFound: td.func(),
}

const defDeps = {
  requestPromise: td.func(),
}

const setup = TU.makeTestSetup({
  defaultHooks: {
    afterTdReset: () => {
      td.when(defDeps.requestPromise(any))
        .thenReturn(fakePromise)
    },
  },
  shell: countryLoaderShell,
  tools: ['td', 'mui'],
  defaultProps: defProps,
  defaultDeps: defDeps,
})

test('components.CountryLoader | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('components.CountryLoader | it should call fetch()', () => {
  setup()

  td.verify(defDeps.requestPromise(), { times: 1, ignoreExtraArgs: true })
})

test('components.CountryLoader | if fetch is still loading, should show loader', () => {
  const wrapper = setup()
  const loaderWrpr = () => wrapper.find('[data-name="loader"]')

  const actual = loaderWrpr().exists()

  assert.isTrue(actual)
})

test('components.CountryLoader | if fetch is resolved, and country code has match, it should show the country name', () => {
  const testWithVars = (countryId, countryLoader) => {
    const props = { countryId }
    const wrapper = setup({
      props,
      hooks: {
        beforeRender: () => {
          td.when(defDeps.requestPromise(any))
            .thenResolve(`{"${countryId.toUpperCase()}":"${countryLoader}"}`)
        },
      },
    })

    const actual = wrapper.text().includes(countryLoader)

    assert.isTrue(actual)
  }

  testWithVars('ph', 'Philippines')
  testWithVars('us', 'United States of America')
  testWithVars('jp', 'Japan')
})

test('components.CountryLoader | if fetch is resolved, but country code has NO match, it should call setNotFound with pathname', () => {
  const props = {
    pathname: 'countries/wrongCountryId',
    countryId: 'wrongCountryId',
  }
  const wrapper = setup({
    props,
    hooks: {
      beforeRender: () => {
        td.when(defDeps.requestPromise(any))
          .thenResolve(`{"DE":"Germany"}`)
      },
    },
  })

  td.verify(defProps.setNotFound('countries/wrongCountryId'), { times: 1 })
})

// We have issues related with SVG, material-ui, and JSDOM. Watch out on these for he meanwhile:
//   https://github.com/callemall/material-ui/issues/8643
//   https://github.com/tmpvar/jsdom/pull/2011
test.skip('components.CountryLoader | if fetch is rejected, should show the country code', () => {
  const testWithVars = (countryId) => {
    const props = { countryId }
    const wrapper = setup({
      props,
      hooks: {
        beforeRender: () => {
          td.replace(console, 'error') // silence logs from the component
          td.when(defDeps.requestPromise(any))
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

test.skip('components.CountryLoader | if fetch is rejected, it should show an info button')
test.skip('components.CountryLoader | if fetch is rejected and info button is clicked, it toggle the info popover')
test.skip('components.CountryLoader | if fetch is rejected, it should NOT fire the click handler twice on first and subsequent key presses of enter and space key')
test.skip('components.CountryLoader | if fetch is rejected, it should render an info popover containing the error message')

test('components.CountryLoader | it should render the correct country flag', () => {
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

test('components.CountryLoader | if wrapper element is specified, it should use it', () => {
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

test('components.CountryLoader | it should pass the other props to the wrapper', () => {
  const props = {
    id: 'sample-id',
    'data-foo': 'bar',
  }
  const wrapper = setup({ props })
  const computedProps = wrapper.props()

  const actual = isSubset(computedProps, props)

  assert.isTrue(actual)
})

test.skip('components.CountryLoader | if unmounted and the fetch is not resolved yet, it should cancel the fetch')
