## Current

**now**

- delete plan
  - PlanForm
    - if id is provided, it should the render delete button
    - if delete button is clicked, it should handleDelete with id
  - EditForm, handleDelete
- eslint, arrow func, don't require result paren

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

- styles
  - animate.css duration
  - material-ui Paper height transition duration
  - react-router-transition animation
    - add shrinking/expanding animation alongside the fading
- css prefixes/polyfills
- production optimization
- **important** change rawgit links as per rawgit.com for production

## Possible trash

- withHeightWatcher test file
