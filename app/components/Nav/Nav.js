import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import MapIcon from 'material-ui/svg-icons/maps/map'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

export default () => (
  <AppBar
    titleStyle={{ fontSize: '1.25rem'}}
    title={(
      <Switch>
        <Route exact path='/overview' render={() => ('Overall Stats')}/>
        <Route exact path='/countries/:countryId/plans/new' render={() => ('Add Plan')}/>
        <Route exact path='/countries/:countryId/plans/:id' render={() => ('Edit Plan')}/>
        <Route exact path='/countries/:countryId/plans/:id/journalize' render={() => ('Journalize')}/>
        <Route exact path='/countries/:countryId/journals/new' render={() => ('Add Journal')}/>
        <Route exact path='/countries/:countryId/journals/:id' render={() => ('Edit Journal')}/>
        <Route render={() => ('Plans & Journals')}/>
      </Switch>
    )}
    showMenuIconButton={false}
    iconElementRight={(
      <Link to='/'>
        <IconButton iconStyle={{ color: 'white' }} tooltip={'go to map'} tooltipPosition={'bottom-left'}>
          <MapIcon />
        </IconButton>
      </Link>
    )}
  />
)
