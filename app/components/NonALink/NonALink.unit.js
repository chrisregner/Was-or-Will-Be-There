import React from 'react'
import { test } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import * as TU from 'services/testUtils'
import { BareNonALink as NonALink } from './NonALink'

const mocks = {
  ev: {
    preventDefault: td.func(),
  }
}

const defProps = {
  to: '',
  history: {
    push: td.func()
  }
}

const setup = TU.makeTestSetup({
  Component: NonALink,
  defaultProps: defProps,
  tools: ['td'],
})

test('NonALink | it should render without error', () => {
  const wrapper = setup()
  const actual = wrapper.exists()

  assert.isTrue(actual)
})

test('NonALink | when clicked, it should call push with correct arg', () => {
  const props = {
    to: '/some/random/link'
  }
  const wrapper = setup({ props })

  wrapper.simulate('click', mocks.ev)

  td.verify(defProps.history.push('/some/random/link'), { times: 1 })
})

test('NonALink | when clicked, it should call push and hooks in correct order, with correct props', () => {
  const callsInOrder = []
  const fakePush = () => { callsInOrder.push('push') }
  const fakeBeforePush = td.func()
  const fakeAfterPush = td.func()

  const props = {
    history: {
      push: fakePush,
    },
    beforePush: fakeBeforePush,
    afterPush: fakeAfterPush,
  }
  const wrapper = setup({
    hooks: {
      afterTdReset: () => {
        td.replace(console, 'warn')

        td.when(fakeBeforePush(td.matchers.anything()))
          .thenDo(() => { callsInOrder.push('beforePush') })
        td.when(fakeAfterPush(td.matchers.anything()))
          .thenDo(() => { callsInOrder.push('afterPush') })
      }
    },
    props
  })

  wrapper.simulate('click', mocks.ev)

  const actual = callsInOrder
  const expected = ['beforePush', 'push', 'afterPush']

  assert.deepEqual(actual, expected)
  td.verify(fakeAfterPush(mocks.ev))
  td.verify(fakeBeforePush(mocks.ev))
})

test('NonALink | it should pass "to" prop as "href"', () => {
  const props = {
    to: 'some/random/link'
  }
  const wrapper = setup({ props })

  const actual = wrapper.prop('href')
  const expected = props.to

  assert.equal(actual, expected)
})

test('NonALink | it should pass other props', () => {
  const props = {
    id: 'some-random-id',
    className: 'some random className,'
  }
  const wrapper = setup({ props })

  const actual = {
    id: wrapper.prop('id'),
    className: wrapper.prop('className'),
  }
  const expected = props

  assert.deepEqual(actual, expected)
})

test('NonALink | it should render children', () => {
  const wrapper = setup({
    childNode: (<div id='random-child'></div>)
  })

  const actual = wrapper.find('#random-child')
    .exists()

  assert.isTrue(actual)
})
