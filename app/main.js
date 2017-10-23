import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from 'components/App'


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Component />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot)
  module.hot.accept('components/App', () => { render(App) })
