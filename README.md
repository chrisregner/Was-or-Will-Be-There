## Todos

- responsive extra paper
  - paper close buttons
- About

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
      - research how to do it
      - leaflet
      - animate.css
      - tachyons
      - react-slick
      - material-ui-next?
    - delete `_ignore` folder
  - credits
    - natural earth data?
    - mapbox?
    - leaflet?
  - deploy
  - DailyRoutinesTrackers
    - correct dummy data (remove the "test" entry)
    - about page/footer to chrisregner.github.io

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

## Todos

- tests
  - nav
  - PaperWithAnimatingHt
  - InsertPaperTransition
  - PlansAndJournals (active item behavior)

## Issues

- Full-size image preview on journal form overflows downward (not visible) if the image is a portrait

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
