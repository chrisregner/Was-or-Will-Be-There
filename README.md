## Current

**now**
- review current
- review pending specs of JournalForm

- JournalForm specs

- redux
  - addJournal()
    - accept predefined id instead
    - add photos
    - delete photos
    - delete photos in Cloudinary
  - editJournal()
    - accept predefined id instead
    - add photos
    - delete photos
    - delete photos in Cloudinary
  - deletePhotos()

- containers
  - AddJournalForm
    - add predefined id in initialValues

- share countryId on countryModal
- journal items
- no plan/journal/both message
- country/plan/journal 404
- automatic image deleting (when certain limit is met, delete in the next midnight)

- manual test
  - adding journal
  - editing journal
  - deleting journal
  - adding photo
  - deleting photo of saved journals
  - deleting photo of unsaved journals

---

cThumbUrlFormat: http://res.cloudinary.com/chrisregner/image/upload/c_limit,h_60,w_90/${urlPart}
cUrlFormat: http://res.cloudinary.com/chrisregner/image/upload/${urlPart}
imgPathPart: v1509689468/wowbt/u1ghlbn5nvcrwfjnabvr.png

---

Map/Countries
  Overview
  Journals
    Journal
      EditJournal
    EditJournals
      EditPlan

---

√ PlanItem | it should render without error
√ PlanItem | it should be a link with correct url
√ PlanItem | it should show the plan name
√ PlanItem | when both departure and homecoming is provided, it should show a range
√ PlanItem | when either departure or homecoming is missing, it should show a range with "TBD" as filler
√ PlanItem | when no date is provided, it should NOT show a range
√ PlanItem | it should render the time badge with correct props

---

## Features (todo)

- features
  - core
    - **done** planner
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
  - notification
    - plan turning into journal
      - notify to suggest adding photos to new journal entry
    - notify when...
      - 30 days before an departure/homecoming
      - 7 days before an departure/homecoming
      - 1 day before an departure/homecoming
      - 2 hours before an departure/homecoming
      - the time of departure/homecoming
  - navbar
  - the map
- additional features
  - **important** world overview page?
  - **important** country overview page?
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
