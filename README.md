- identify animations in web app
  - fadingmounter
    - // add will transform
  - collapse
    - add will transform
    - use modal instead in mobile?
  - animatinghtdiv
    - // add will transform
    - only in desktop?
  - photofieldset fullsized image
    - add will transform

- disappearLastly - is that harmful?

- will change
- transform
- avoid composite/implicit composite?
- why remove some styles on transition end?

---

## Todos

- features to test
  - navbar
    - navbar links
  - map
    - map controls
    - map clickable polygons
    - map hover
  - overview
    - close link
    - individual country link
    - open map link
  - plans
    - add a plan w/ min data
    - add a plan w/ max data
    - edit plan to max data
    - edit plan to min data
    - plans
    - delete plans
  - journals
    - add a journal w/ min data
    - add a journal w/ max data
    - edit journal to max data
    - edit journal to min data
    - image deletion
      - on manual delete
      - on deleteion of journal itself
      - on cancel
    - journals
    - delete journals

- test in...
  - ie11
  - edge
  - safari?
  - firefox
  - mobile
  - chrome

- issues
  - IE11
    - **maybe done** svg/png
      - use png in ie/edge
    - **maybe done** BottomNavigation in PlansAndJournals
      - see if mui-next has addressed this first
      - use div instead of divs, flexed element can't have buttons as children (some browsers)
    - **maybe done** mui text-field shows a giant "X"
      - use the text-input from mui-next
      - maybe replace all other form components as well?
      - issues
  - cross-browser
    - photo deletion
      - ie says: xhr errror
      - chrome says: cors
    - *least priority* Full-size image preview on journal form overflows downward (not visible) if the image is a portrait
    - *least priority* when switching pages quickly in this manner: paper route -> map -> paper route, vertical scrollbar appears


- final readme.md
  - credits
    - natural earth data
  - linted?
  - deployed?
  - known issues?

- add known issues to daily routines tracker?

- delete cloudinary images

---

country plans           - /countries/:countryId/plans
country journals        - /countries/:countryId/journals
new plan                - /countries/:countryId/plans/new
edit plan               - /countries/:countryId/plans/:id
journalize plan         - /countries/:countryId/plans/journalize
new journal             - /countries/:countryId/journals/new
edit journal            - /countries/:countryId/journals/:id
world overview          - /about

---

## Possible additional features

- allow clearing datepicker value
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
