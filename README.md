## Todos

- world overview
  - no of plans
  - no of journals
  - no of countries traveled
  - list of countries with... *alphabetical*
    - link
    - plan name
    - has plan?
    - has journal?
  - go back to map link

- country overview, edit on right-nav-link?
  - plans tab
    - list
      - name
      - dates
      - notes
  - journals tab
    - all pictures
      - descriptions
    - list
      - name
      - dates
      - text
      - pictures
        - descriptions

- navbar

- notification
  - plan turning into journal
    - notify to suggest adding photos to new journal entry
  - notify when...
    - 30 days before an departure/homecoming
    - 7 days before an departure/homecoming
    - 1 day before an departure/homecoming
    - on the day of departure/homecoming

- the map
  - if has plan, destination icon
  - if has journal, flag icon

- misc
  - preloaded state?
  - redux-persist
  - accessibility
  - performance test
  - deploy
  - performance test
  - credits
  - misc
    - styles
      - animate.css duration
      - material-ui Paper height transition duration
      - react-router-transition animation
        - add shrinking/expanding animation alongside the fading
    - css prefixes/polyfills
    - production optimization
    - **important** change rawgit links as per rawgit.com for production
    - remove excess deps

---

map              - /
world overview   - /countries/
country overview - /countries/:countryId
new plan         - /countries/:countryId/plans/new
edit plan        - /countries/:countryId/plans/:id
new journal      - /countries/:countryId/journals/new
edit journal     - /countries/:countryId/journals/:id

---

- scenario
  - move country names to state

- separate PaperRoutes

- CountryName in PaperRoutes?
- CountryNames in WorldOverview?

  - it should render without error
  - it should call fetch()
  - if fetch is still loading, should show loader
  - if fetch is resolved, and country code has match, it should show the country name
  - if fetch is resolved, but country code has NO match, it should call setNotFound with pathname
  - if fetch is rejected, should show the country code
  - if fetch is rejected, it should show an info button
  - if fetch is rejected and info button is clicked, it toggle the info popover
  - if fetch is rejected, it should NOT fire the click handler twice on first and subsequent key presses of enter and space key
  - if fetch is rejected, it should render an info popover containing the error message
  - it should render the correct country flag
  - if wrapper element is specified, it should use it
  - it should pass the other props to the wrapper
  - if unmounted, it should cancel the fetch

---

## Additional features

- additional features
  - sort
    - chronologically
    - geographically
  - input on map to search and select places
    - pan map upon selection
  - automatic image deleting (when certain limit is met, delete in the next midnight)

## Manual testing
- plans crud
  - snackbar
- journals crud
  - images crud
  - snackbar
