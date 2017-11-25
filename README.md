## Todos

- perf
  - react optimization tips
  - research how to reduce scripting time
  - research how to test
- separate topojson?
- make features to test
  - test in ie11, chrome, mobile
- make looks to test
  - test in ie11, chrome, firefox, mobile

- misc
  - performance
    - css prefixes/polyfills
      - how do we know they work? as long as crossbrowser test passes, I suppose
    - webpack production optimization
      - check if webpack production config makes difference in production output
      - check if babel production config makes difference in production output
      - check if remote deletion of photo works
  - crossbrowser test
    - responsiveness test for each
  - final readme.md
    - credits
      - natural earth data

  - linted?
  - deployed?

---

map                     - /
world overview          - /overview
country plans           - /countries/:countryId/plans
country journals        - /countries/:countryId/journals
new plan                - /countries/:countryId/plans/new
edit plan               - /countries/:countryId/plans/:id
journalize plan         - /countries/:countryId/plans/journalize
new journal             - /countries/:countryId/journals/new
edit journal            - /countries/:countryId/journals/:id
world overview          - /about

---

## Todos

- tests
  - nav
  - PaperWithAnimatingHt
  - InsertPaperTransition
  - PlansAndJournals (active item behavior)

## Issues

- Full-size image preview on journal form overflows downward (not visible) if the image is a portrait

## Possible additional features

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
