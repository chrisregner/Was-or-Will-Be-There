## Todos

- country/plan/journal 404
  - cancel fetch of CountryLoad on unmount
  - country/ph/journals/id/*
  - country/ph/plans/id/*
  - country/ph/journals/:crap
  - country/ph/plans/:crap
  - country/:crap
  - country/*
  - *
  - TODO: Put the uppermost route within Switch with fallback route that only sets notFound in route
  - TODO: Add fallback route with component that only sets notFound in route

- countries overview
  - no of journals
  - no of countries traveled
  - no of plans
  - plans only, collapsible if has notes
  - journals only, with photos, collapsible if has notes/photos
- country overview
  - plans only, collapsible if has notes
  - journals only, with photos, collapsible if has notes/photos

- notification
  - plan turning into journal
    - notify to suggest adding photos to new journal entry
  - notify when...
    - 30 days before an departure/homecoming
    - 7 days before an departure/homecoming
    - 1 day before an departure/homecoming
    - on the day of departure/homecoming
- navbar
- the map
  - if has plan, destination icon
  - if has journal, flag icon

- redux-persist

---

cThumbUrlFormat: http://res.cloudinary.com/chrisregner/image/upload/c_limit,h_60,w_90/${urlPart}
cUrlFormat: http://res.cloudinary.com/chrisregner/image/upload/${urlPart}
imgPathPart: v1509689468/wowbt/u1ghlbn5nvcrwfjnabvr.png

---

DAY 1
  JOURNAL FORM
  SNACKBAR
DAY 2
  OVERVIEWS
DAY 3
  NOTIF
DAY 4
  MAP
DAY 5
  POLISH???

---

## Additional features

- additional features
  - sort
    - chronologically
    - geographically
  - input on map to search and select places
    - pan map upon selection
  - automatic image deleting (when certain limit is met, delete in the next midnight)

## Misc todo

- styles
  - animate.css duration
  - material-ui Paper height transition duration
  - react-router-transition animation
    - add shrinking/expanding animation alongside the fading
- css prefixes/polyfills
- production optimization
- **important** change rawgit links as per rawgit.com for production
- remove excess deps

## Manual testing
- plans crud
  - snackbar
- journals crud
  - images crud
  - snackbar

## Possible trash

- withHeightWatcher test file
