## Current

**now**

- route transition
  - save paper heights in for each paper route
  - use the highest paper height as paper height
    - write HOC
    - applyHOC
    - animate the paper height as well
- move side effect (id) from reducer to action creator

- snackbar component and container
- integration test
- configure linter

---

## Integration test

- Home/Map
- PlansAndJournals
  - should change route
  - paper height should change
- Add plan
  - should change route
  - should include countryId
  - should add the plan
  - should notify as well
  - paper height should change
- PlansAndJournals
  - should change route
  - notification
    - should be hideable
  - paper height should change
- EditPlan
- DeletePlan

---

test('PlanForm | it should call setPaperHeight with correct args after mounting', t => {
  setup({ useMount: true })

  t.doesNotThrow(() => {
    td.verify(
      mockFn.setPaperHeight(td.matchers.isA(Number)),
      { times: 1 }
    )
  })
  t.end()
})

---

## Features (todo)

- features
  - core
    - planner
      - add a plan to a country
        - data shape
          - plan name
          - notes
          - departure
          - homecoming
      - edit a plan for a country
        - show country name + flag
      - delete a plan for a country
      - NOTES
        - show country name + flag
        - snackbar after deleting/adding/editing a plan
    - journal
      - add a journal to a country
        - data shape
          - title
          - date
            - start
            - end
          - journal text
          - photos ???
            - date
            - description
      - edit a journal
      - delete a journal
      - NOTES
        - show country name + flag
        - snackbar after deleting/adding/editing a plan
    - show plans and journals
      - NOTES
        - show country name + flag
    - list all plans and journals
      - NOTES
        - show country name + flag for each
      - pan map to location of any selected entry
  - plan turning into journal
    - notify to suggest adding photos to new journal entry
  - notify when...
    - 30 days before an departure/homecoming
    - 7 days before an departure/homecoming
    - 1 day before an departure/homecoming
    - 2 hours before an departure/homecoming
    - the time of departure/homecoming
- additional features
  - sort
    - chronologically
    - geographically
  - input on map to search and select places
    - pan map upon selection

## Misc todo

- css prefixes/polyfills
- production optimization
- **important** change rawgit links as per rawgit.com for production
