import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import { configureStore } from 'state/store'

import App from 'components/App'

const store = configureStore()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Provider store={store}>
          <Component />
        </Provider>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot)
  module.hot.accept('components/App', () => { render(App) })
