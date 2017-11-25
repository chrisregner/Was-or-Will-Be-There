import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import configureStore from 'state/store'
import App from 'containers/App'

const { persistor, store } = configureStore()

const render = (Component) => {
  ReactDOM.render(
    (
      <PersistGate persistor={persistor}>
        <AppContainer>
          <Provider store={store}>
            <HashRouter
              basename={
                process.env.NODE_ENV === 'production'
                  ? '/plans-and-journals'
                  : '/'
              }
            >
              <Component />
            </HashRouter>
          </Provider>
        </AppContainer>
      </PersistGate>
    ),
    document.getElementById('root'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot)
  module.hot.accept('containers/App', () => { render(App) })
