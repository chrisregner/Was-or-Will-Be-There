import React from 'react'
import styled from 'styled-components'
import { Route, Redirect, Switch } from 'react-router-dom'
import { AnimatedRoute } from 'react-router-transition'
import * as R from 'ramda'

import Paper from 'material-ui/Paper'
import CollapsibleItem from 'components/CollapsibleItem'
import AnimatingHtDiv from 'components/AnimatingHtDiv'
import InsertPaperTransition from 'components/InsertPaperTransition'
import PlansAndJournals from 'containers/PlansAndJournals'
import AddPlanForm from 'containers/AddPlanForm'
import EditPlanForm from 'containers/EditPlanForm'
import AddJournalForm from 'containers/AddJournalForm'
import EditJournalForm from 'containers/EditJournalForm'
import JournalizeJournalForm from 'containers/JournalizeJournalForm'
import NotFoundSetter from 'containers/NotFoundSetter'
import SmartCountryNameAndFlag from 'containers/SmartCountryNameAndFlag'
import WorldOverview from 'containers/WorldOverview'

/*

rgba(0, 0, 0, 0.1)

 */

const InsertPaperTransitionWrpr = styled.div`
  & > :only-child {
    width: 48rem;
  }

  & > :nth-child(1):not(:only-child) {
    width: 40%;
  }

  & > :nth-child(2) {
    width: 60%;
  }
`

const PaperRoutes = ({ location }) => (
  <div
    style={{
      top: 48,
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
    }}
    className='relative z-1 ph1 ph2-m ph2-l pv2 pv3-m pv3-l h-100'
  >
    {/* Mobile and Tablet */}
    <div className='dn-l ph1 ph2-m tl mw7 center'>
      <Paper>
        <AnimatingHtDiv>
          <Route path='/countries/:countryId' component={SmartCountryNameAndFlag} />

          <Switch>
            <Route
              exact
              path='/countries/:countryId'
              render={({ match }) => (<Redirect to={`/countries/${match.params.countryId}/plans`} />)}
            />
            <Route exact path='/stats' component={WorldOverview} />
            <Route exact path='/countries/:countryId/plans' component={PlansAndJournals} />
            <Route exact path='/countries/:countryId/journals' component={PlansAndJournals} />
            <Route exact path='/countries/:countryId/plans/new' component={AddPlanForm} />
            <Route exact path='/countries/:countryId/plans/:id' component={EditPlanForm} />
            <Route exact path='/countries/:countryId/plans/:id/journalize' component={JournalizeJournalForm} />
            <Route exact path='/countries/:countryId/journals/new' component={AddJournalForm} />
            <Route exact path='/countries/:countryId/journals/:id' component={EditJournalForm} />
            <Route component={NotFoundSetter} />
          </Switch>
        </AnimatingHtDiv>
      </Paper>
    </div>

    {/* Desktop Only */}
    {/*38 + 62*/}
    <InsertPaperTransitionWrpr className='flex items-start justify-center mw9 w-100'>
      <InsertPaperTransition nth={1} pathname={location.pathname} className='relative z-1 dn db-l ph2 tl'>
        <Paper>
          <AnimatingHtDiv>
            <div>
              <Route path='/countries/:countryId' component={SmartCountryNameAndFlag} />
            </div>

            <Switch>
              <Route exact path='/stats' component={WorldOverview} />
              <Route exact path='/countries/:countryId/plans' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/journals' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/plans/new' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/plans/:id' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/plans/:id/journalize' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/journals/new' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/journals/:id' component={PlansAndJournals} />
            </Switch>
          </AnimatingHtDiv>
        </Paper>
      </InsertPaperTransition>

      <Route
        path='/countries/:countryId/:plansOrJournals(plans|journals)/:any'
        component={(props) => (
          <InsertPaperTransition nth={2} pathname={props.location.pathname} className='relative dn db-l ph2 tl'>
            <Paper>
              <AnimatingHtDiv>
                <Switch>
                  <Route exact path='/countries/:countryId/plans/new' component={AddPlanForm} />
                  <Route exact path='/countries/:countryId/plans/:id' component={EditPlanForm} />
                  <Route exact path='/countries/:countryId/plans/:id/journalize' component={JournalizeJournalForm} />
                  <Route exact path='/countries/:countryId/journals/new' component={AddJournalForm} />
                  <Route exact path='/countries/:countryId/journals/:id' component={EditJournalForm} />
                </Switch>
              </AnimatingHtDiv>
            </Paper>
          </InsertPaperTransition>
        )}
      />
    </InsertPaperTransitionWrpr>
  </div>
)

export default PaperRoutes
