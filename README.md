## Todos

- navbar

- the map
  - if has plan, destination icon
  - if has journal, flag icon

- misc
    - css prefixes/polyfills
  - state configuration
    - preloaded state?
    - redux-persist
  - responsiveness
  - accessibility
  - performance test (before and after deployment)
    - research more
  - webpack production optimization
    - reenable remote deletion of photo
    - research more
    - change rawgit links as per rawgit.com for production
    - remove excess deps
    - delete `_ignore` folder
  - credits
  - deploy
  - correct DailyRoutinesTrackers dummy data (remove the "test" entry)

---

map                     - /
world overview          - /overview/
country plans           - /countries/:countryId/ **TODO: redirect to plans when in this route**
country plans           - /countries/:countryId/plans
country journals        - /countries/:countryId/journals
edit plans and journals - /countries/:countryId/edit?
new plan                - /countries/:countryId/plans/new
edit plan               - /countries/:countryId/plans/:id
new journal             - /countries/:countryId/journals/new
edit journal            - /countries/:countryId/journals/:id

---

## Additional features

- additional features
  - notification
    - notify when...
      - 30 days before an departure/homecoming
      - 7 days before an departure/homecoming
      - 1 day before an departure/homecoming
      - on the day of departure/homecoming
      - 1 day after homecoming (journalize)
  - sort plans/journals/both
    - chronologically
    - geographically
  - input on map to search and select places
    - pan map upon selection
  - automatic image deleting (when certain limit is met, delete in the next midnight?)
