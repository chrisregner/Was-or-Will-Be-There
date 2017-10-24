import test from 'ava'
import React from 'react'
import { shallow, mount } from 'enzyme'
import td from 'testdouble'

import { smartMergeDeep } from 'services/fpUtils'

import { CountryNameShell } from './CountryName'

const fakePromise = td.object(['then', 'catch'])
const fakeRequestPromise = td.func()

const setup = (args = {}) => {
  const any = td.matchers.anything()

  td.reset()
  td.when(fakeRequestPromise(any))
    .thenReturn(fakePromise)
  td.when(fakePromise.then(any))
    .thenReturn(fakePromise)
  td.when(fakePromise.catch(any))
    .thenReturn(fakePromise)

  const { props, deps, useMount } = args

  const defaultProps = {
    countryId: '',
  }
  const defaultDeps = {
    requestPromise: fakeRequestPromise,
  }

  const finalProps = smartMergeDeep(defaultProps, props)
  const finalDeps = smartMergeDeep(defaultDeps, deps)
  const CountryName = CountryNameShell(finalDeps)
  const renderer = useMount ? mount : shallow

  return renderer(<CountryName {...finalProps} />)
}

test('it should render without error', t => {
  const wrapper = setup()
  const actual = wrapper.exists()

  t.true(actual)
})

test('it should call fetch()', t => {
  const wrapper = setup({ useMount: true })

  t.notThrows(() => {
    td.verify(fakeRequestPromise(), { times: 1, ignoreExtraArgs: true })
  })
})

test('if fetch is still loading, should show loader', t => {
  const wrapper = setup({ useMount: true })
  const loaderWrpr = () => wrapper.find('[data-name="loader"]')

  const actual = loaderWrpr().exists()

  t.true(actual)
})

test('if fetch is resolved, should show the country name', t => {
  const testWithVars = (countryId, countryName) => {
    const prop = { countryId }
    const wrapper = setup({ useMount: true, prop })

    // ...
    // TRY thenCatch/thenReturn
    // OR TRY td.matchers.captor()
  }
})

test.todo('if fetch is rejected, should show the country code')
test.todo('if fetch is rejected, should show a info button')
test.todo('if info button is clicked, it should toggle the popover')
