## Todos

- HOW TO MANAGE JOURNALS AND PHOTOS???

- JournalForm
  - separate photos and form values?
  - don't delete uploaded photos that are deleted immediately
    - just blur it
    - allow restoring it
  - combine photosDeleted and photos

- redux
  - addJournal()
    - save journal
      - photos: ids only
      - don't include deleted photos
    - snackbar
  - editJournal()
    - save journal
      - photos: ids only
      - remove deleted photos
      - add new photos
      - retain untouched old photos
    - snackbar
  - deleteJournal()
    - delete journal
    - snackbar
  - add photos
    - don't include deleted photos
    - remove deleted photos in cloud
  - update photos
    - add new photos
    - retain untouched old photos
    - update changed photo descriptions
    - remove deleted photos
    - remove deleted photos in cloud
  - delete photos
    - delete all old photos in cloud
    - delete all newly-uploaded photos in cloud
    - delete all photos in redux
  - getJournalByIdWithPhotos()
    - get photos as well

- manual test
  - adding journal
    - deleting deleted photos upon save on cloud
    - deleting all photos upon cancel on cloud
    - adding details of journal
    - snackbar
  - editing journal
    - deleting old-and-deleted photos upon save on cloud
    - deleting newly-uploaded-but-deleted photos upon save on cloud
    - deleting all newly-uploaded photos upon cancel on cloud
    - deleting correct photos in redux (old-and-deleted only)
    - updating photo descriptions
    - adding new photos
    - updating other details of journal
    - snackbar
  - deleting journal
    - deleting all newly-uploaded photos upon delete on cloud
    - deleting all images upon delete on cloud
    - deleting all images upon delete in redux
    - deleting the journal itself
    - snackbar

- share CountryName on /countries/* pages
- no plan/journal message
- country/plan/journal 404
- automatic image deleting (when certain limit is met, delete in the next midnight)

- journal items
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

## Additional features

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
