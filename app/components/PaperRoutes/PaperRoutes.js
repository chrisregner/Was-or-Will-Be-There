import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { AnimatedSwitch } from 'react-router-transition'

import PaperWithHeight from 'containers/PaperWithHeight'
import NotFound from 'components/NotFound'
import PopulatedPlansAndJournals from 'containers/PopulatedPlansAndJournals'
import AddPlanForm from 'containers/AddPlanForm'
import EditPlanForm from 'containers/EditPlanForm'
import AddJournalForm from 'containers/AddJournalForm'
import EditJournalForm from 'containers/EditJournalForm'
import NotFoundSetter from 'containers/NotFoundSetter'

const AnimatedSwitchWrpr = styled.div`
  & > div > div,
  & > div > form {
    position: absolute;
    width: 100%;
  }
`

const PaperPages = () => (
  <div
    style={{
      top: 48,
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
    }}
    className='relative z-1 pa2 h-100'
  >
    <PaperWithHeight>
      {/*CountryName here*/}
      <AnimatedSwitchWrpr className='relative'>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <Route exact path='/countries/:countryId' component={PopulatedPlansAndJournals} />
          <Route exact path='/countries/:countryId/plans/new' component={AddPlanForm} />
          <Route exact path='/countries/:countryId/plans/:id' component={EditPlanForm} />
          <Route exact path='/countries/:countryId/journals/new' component={AddJournalForm} />
          <Route exact path='/countries/:countryId/journals/:id' component={EditJournalForm} />
          <Route component={NotFoundSetter} />
        </AnimatedSwitch>
      </AnimatedSwitchWrpr>
    </PaperWithHeight>
  </div>
)

export default PaperPages
