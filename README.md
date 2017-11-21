## Todos

- flag loader
- nav
  - right icon, use menu instead
    - overview
    - map
  - back button

- better dummy data
- redux-persist

- misc
  - responsiveness
  - accessibility
  - css prefixes/polyfills
  - crossbrowser test?
  - performance test (before and after deployment)
    - research more
  - webpack production optimization
    - reenable remote deletion of photo
    - research more
    - change rawgit links as per rawgit.com for production
    - remove excess deps
    - delete `_ignore` folder
  - credits
    - natural earth data?
    - mapbox?
    - leaflet?
  - deploy
  - correct DailyRoutinesTrackers dummy data (remove the "test" entry)

---

map                     - /
world overview          - /overview/
country plans           - /countries/:countryId/plans
country journals        - /countries/:countryId/journals
new plan                - /countries/:countryId/plans/new
edit plan               - /countries/:countryId/plans/:id
journalize plan         - /countries/:countryId/plans/journalize
new journal             - /countries/:countryId/journals/new
edit journal            - /countries/:countryId/journals/:id

---

## Possible Additional features

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
