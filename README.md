delete image overlay
full-sized image
full-sized image close button
paper close
paper close in full sized image
map?

-

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
    - image preview
    - image delete/restore
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
  - mobile performance
  - photo deletion error (ie, firefox?)
  - Full-size image preview on journal form are shrunk vertically when the image is too long (chrome)
  - when switching pages quickly in this manner: paper route -> map -> paper route, vertical scrollbar appears (all)

- final readme.md
  - credits
    - natural earth data
  - linted?
  - deployed?
  - known issues?

### mobile performance notes

- check repaints on route change
  - try removing animatinghtdiv
- identify animations in web app
  - fadingmounter
    - possible fixes
    - **done** add 'will change' style
  - collapse
    - add 'will change' style?
    - use modal instead in mobile?
  - animatinghtdiv
    - add 'will change' style?
    - only in desktop?
  - photofieldset fullsized image
    - **done** add 'will change' style
  - insert paper transition
    - **done** add 'will change' style
- disappearLastly animation - is that harmful?
- do we have composite/implicit composite?
- should we remove transition styles on transition end?

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
