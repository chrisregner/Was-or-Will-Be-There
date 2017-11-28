## Todos

- make list of features to test
  - test in ie11 and mobile
    - image deletion
      - on manual delete
      - on deleteion of journal itself
      - on cancel
  - test in ie11, chrome, firefox, mobile
    - make this list

- issues
  - photo deletion in cloud
  - IE11, BottomNavigation in PlansAndJournals, flexed element can't have buttons as children, must be another div or other
  - IE11, mui text-field shows a giant "X"
  - Full-size image preview on journal form overflows downward (not visible) if the image is a portrait

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
