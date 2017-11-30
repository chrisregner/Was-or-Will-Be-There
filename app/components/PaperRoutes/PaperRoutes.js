import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Redirect, Switch } from 'react-router-dom'

import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/content/clear'
import Paper from 'material-ui/Paper'

import AnimatingHtDiv from 'components/AnimatingHtDiv'
import InsertPaperTransition from 'components/InsertPaperTransition'
import About from 'components/About'
import NonALink from 'components/NonALink'
import PlansAndJournals from 'containers/PlansAndJournals'
import AddPlanForm from 'containers/AddPlanForm'
import EditPlanForm from 'containers/EditPlanForm'
import AddJournalForm from 'containers/AddJournalForm'
import EditJournalForm from 'containers/EditJournalForm'
import JournalizeJournalForm from 'containers/JournalizeJournalForm'
import NotFoundSetter from 'containers/NotFoundSetter'
import SmartCountryNameAndFlag from 'containers/SmartCountryNameAndFlag'
import WorldOverview from 'containers/WorldOverview'

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

const CloseToMap = () => (
  <NonALink className='absolute top-0 right-0 z-1 db pa1' to='/'>
    <IconButton
      style={{ width: 36, height: 36, padding: 8 }}
      iconStyle={{ width: 18, height: 18 }}
      tooltip='Go back to maps'
      tooltipPosition='bottom-left'
    >
      <CloseIcon />
    </IconButton>
  </NonALink>
)

const CloseToPlansOrJournals = ({ match }) => (
  <NonALink
    to={`/countries/${match.params.countryId}/${match.params.plansOrJournals}`}
    className='absolute top-0 right-0 z-1 db pa1'
  >
    <IconButton
      style={{ width: 36, height: 36, padding: 8 }}
      iconStyle={{ width: 18, height: 18 }}
      tooltip={`Go back to ${match.params.plansOrJournals}`}
      tooltipPosition='bottom-left'
    >
      <CloseIcon />
    </IconButton>
  </NonALink>
)

const PaperRoutes = ({ location }) => (
  <div
    style={{
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
    }}
    className='relative z-1 ph1 ph2-m ph2-l pv2 pv3-m pv3-l h-100'
  >
    {
      /**
       * Fixes the issue of having big "X" on ie11 TextInput (material-ui)
       * https://github.com/mui-org/material-ui/issues/5055#issuecomment-241896137
       */
    }
    <style type='text/css' dangerouslySetInnerHTML={{__html: '::-ms-clear {display: none;}'}} />

    {/* Mobile and Tablet */}
    <div className='dn-l ph1 ph2-m tl mw7 center'>
      <Paper className='relative'>
        {/* Close Button */}
        <Switch>
          <Route exact path='/stats' component={CloseToMap} />
          <Route exact path='/about' component={CloseToMap} />
          <Route exact path='/countries/:countryId/plans' component={CloseToMap} />
          <Route exact path='/countries/:countryId/journals' component={CloseToMap} />
          <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)/new' component={CloseToPlansOrJournals} />
          <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)/:id' component={CloseToPlansOrJournals} />
          <Route exact path='/countries/:countryId/plans/:id/journalize' component={CloseToPlansOrJournals} />
        </Switch>

        {/* Content */}
        <AnimatingHtDiv>
          <Route path='/countries/:countryId' component={SmartCountryNameAndFlag} />

          <Switch>
            <Route
              exact
              path='/countries/:countryId'
              render={({ match }) => (<Redirect to={`/countries/${match.params.countryId}/plans`} />)}
            />
            <Route exact path='/stats' component={WorldOverview} />
            <Route exact path='/about' component={About} />
            <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)' component={PlansAndJournals} />
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
    <InsertPaperTransitionWrpr className='flex items-start justify-center mw9 w-100'>
      <InsertPaperTransition nth={1} pathname={location.pathname} className='relative z-1 dn db-l ph2 tl'>
        <Paper className='relative'>
          {/* Close Button */}
          <Switch>
            <Route exact path='/stats' component={CloseToMap} />
            <Route exact path='/about' component={CloseToMap} />
            <Route exact path='/countries/:countryId/plans' component={CloseToMap} />
            <Route exact path='/countries/:countryId/journals' component={CloseToMap} />
          </Switch>

          {/* Content */}
          <AnimatingHtDiv>
            <div>
              <Route path='/countries/:countryId' component={SmartCountryNameAndFlag} />
            </div>

            <Switch>
              <Route exact path='/stats' component={WorldOverview} />
              <Route exact path='/about' component={About} />
              <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)/new' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)/:id' component={PlansAndJournals} />
              <Route exact path='/countries/:countryId/:plansOrJournals(plans)/:id/journalize' component={PlansAndJournals} />
            </Switch>
          </AnimatingHtDiv>
        </Paper>
      </InsertPaperTransition>

      <Route
        path='/countries/:countryId/:plansOrJournals(plans|journals)/:any'
        render={props => (
          <InsertPaperTransition nth={2} pathname={props.location.pathname} className='relative dn db-l ph2 tl'>
            <Paper className='relative'>
              {/* Close Button */}
              <Switch>
                <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)/new' component={CloseToPlansOrJournals} />
                <Route exact path='/countries/:countryId/:plansOrJournals(plans|journals)/:id' component={CloseToPlansOrJournals} />
                <Route exact path='/countries/:countryId/plans/:id/journalize' component={CloseToPlansOrJournals} />
              </Switch>

              {/* Content */}
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

PaperRoutes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

CloseToPlansOrJournals.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      countryId: PropTypes.string.isRequired,
      plansOrJournals: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PaperRoutes