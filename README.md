## Todos

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

- journalize?
- scroll on location change
- transition from no paper to have paper

- misc
  - styles
    - animation
      - animate.css duration
      - material-ui Paper height transition duration
      - react-router-transition animation
        - add shrinking/expanding animation alongside the fading
    - css prefixes/polyfills
  - state configuration
    - preloaded state?
    - redux-persist
  - responsiveness
  - accessibility
  - performance test (before and after deployment)
    - research more
  - webpack production optimization
    - research more
    - change rawgit links as per rawgit.com for production
    - remove excess deps
  - deploy
  - credits

---

map                     - /
world overview          - /overview/
country overview        - /countries/:countryId
edit plans and journals - /countries/:countryId/edit?
new plan                - /countries/:countryId/plans/new
edit plan               - /countries/:countryId/plans/:id
new journal             - /countries/:countryId/journals/new
edit journal            - /countries/:countryId/journals/:id

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
