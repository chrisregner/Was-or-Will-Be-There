import { test } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import * as TU from 'services/testUtils'
import CountryNameAndFlag from './CountryNameAndFlag'
import { createFlagUrl } from 'constants/'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiEnzymeOpts = {
  context: { muiTheme: getMuiTheme() },
  childContextTypes: { muiTheme: PropTypes.object },
}

const defProps = {
  countryId: '',
}

const setup = TU.makeTestSetup({
  Component: CountryNameAndFlag,
  defaultProps: defProps,
})

test('components.CountryNameAndFlag | it should render without error', () => {
  const actual = setup().exists()
  assert.isTrue(actual)
})

test('components.CountryNameAndFlag | it should render the correct image', () => {
  const testWithVar = (countryId) => {
    const props = { countryId }
    const targetNode = setup({ props })
      .find('.country-name-and-flag-flag')
      .prop('loaded')

    const actual = shallow(targetNode, muiEnzymeOpts)
      .find('.country-name-and-flag-flag')
      .prop('src')
    const expected = createFlagUrl(countryId)

    assert.equal(actual, expected)
  }

  testWithVar('ph')
  testWithVar('jp')
  testWithVar('us')
})

test('components.CountryNameAndFlag | it should add the correct alt attribute to image', () => {
  const testWithVars = (countryId, countryName) => {
    const props = { countryId }
    const targetNode = setup({ props })
      .find('.country-name-and-flag-flag')
      .prop('loaded')

    const actual = shallow(targetNode, muiEnzymeOpts)
      .find('.country-name-and-flag-flag')
      .prop('alt')
    const expected = countryName

    assert.include(actual, expected)
  }

  testWithVars('ph', 'Philippines')
  testWithVars('jp', 'Japan')
  testWithVars('us', 'United States')
})

test('components.CountryNameAndFlag | it should render the correct country name', () => {
  const testWithVars = (countryId, countryName) => {
    const props = { countryId }
    const actual = setup({ props })
      .find('.country-name-and-flag-country-name')
      .text()
    const expected = countryName

    assert.include(actual, expected)
  }

  testWithVars('ph', 'Philippines')
  testWithVars('jp', 'Japan')
  testWithVars('us', 'United States')
})

test('components.CountryNameAndFlag | if custom flag wrapper class is provided, it should use it and NOT the default', () => {
  const props = {
    customClassNames: {
      flagWrapper: 'my random class',
    },
  }
  const targetNode = setup({ props })
    .find('.country-name-and-flag-flag-wrapper')
    .prop('loaded')

  const actual = shallow(targetNode, muiEnzymeOpts)
    .find('.country-name-and-flag-flag-wrapper')
    .prop('className')
    .split(' ')
  const expected = ['my', 'random', 'class']
  const notExpected = 'country-name-and-flag-default'

  assert.includeMembers(actual, expected)
  assert.notInclude(actual, notExpected)
})

test('components.CountryNameAndFlag | if custom flag wrapper class is NOT provided, it should use the default', () => {
  const targetNode = setup()
    .find('.country-name-and-flag-flag-wrapper')
    .prop('loaded')

  const actual = shallow(targetNode, muiEnzymeOpts)
    .find('.country-name-and-flag-flag-wrapper')
    .prop('className')
    .split(' ')
  const expected = 'country-name-and-flag-default'

  assert.include(actual, expected)
})

test('components.CountryNameAndFlag | if custom flag class is provided, it should use it and NOT the default', () => {
  const props = {
    customClassNames: {
      flag: 'my random class',
    },
  }

  const targetNode = setup({ props })
    .find('.country-name-and-flag-flag')
    .prop('loaded')

  const actual = shallow(targetNode, muiEnzymeOpts)
    .find('.country-name-and-flag-flag')
    .prop('className')
    .split(' ')
  const expected = ['my', 'random', 'class']
  const notExpected = 'country-name-and-flag-default'

  assert.includeMembers(actual, expected)
  assert.notInclude(actual, notExpected)
})

test('components.CountryNameAndFlag | if custom flag class is NOT provided, it should use the default', () => {
  const targetNode = setup()
    .find('.country-name-and-flag-flag')
    .prop('loaded')

  const actual = shallow(targetNode, muiEnzymeOpts)
    .find('.country-name-and-flag-flag')
    .prop('className')
    .split(' ')
  const expected = 'country-name-and-flag-default'

  assert.include(actual, expected)
})

test('components.CountryNameAndFlag | if custom country name class is provided, it should use it and NOT the default', () => {
  const props = {
    customClassNames: {
      countryName: 'my random class',
    },
  }

  const actual = setup({ props })
    .find('.country-name-and-flag-country-name')
    .prop('className')
    .split(' ')
  const expected = ['my', 'random', 'class']
  const notExpected = 'country-name-and-flag-default'

  assert.includeMembers(actual, expected)
  assert.notInclude(actual, notExpected)
})

test('components.CountryNameAndFlag | if custom country name class is NOT provided, it should use the default', () => {
  const actual = setup()
    .find('.country-name-and-flag-country-name')
    .prop('className')
    .split(' ')
  const expected = 'country-name-and-flag-default'

  assert.include(actual, expected)
})

test('components.CountryNameAndFlag | if custom loader class is provided, it should use it', () => {
  const props = {
    customClassNames: {
      loader: 'my random class',
    },
  }

  const targetNode = setup({ props })
    .find('.country-name-and-flag-flag')
    .prop('loader')

  const actual = shallow(targetNode, muiEnzymeOpts)
    .prop('className')
    .split(' ')
  const expected = ['my', 'random', 'class']

  assert.includeMembers(actual, expected)
})
