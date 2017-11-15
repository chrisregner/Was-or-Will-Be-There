import addDays from 'date-fns/add_days'
import subDays from 'date-fns/sub_days'
import I from 'immutable'

const today = new Date()
const oneDayAgo = subDays(today, 1)
const oneWeekAgo = subDays(today, 7)
const oneYearAgo = subDays(today, 365)
const oneYearandTwoWeeksAgo = subDays(today, 379)
const inOneDay = addDays(today, 1)
const inFifteenDays = addDays(today, 15)
const inOneMonth = addDays(today, 30)
const inOneMonthAndQuarter = addDays(today, 45)
const inTwoMonths = addDays(today, 60)

export default I.Map({
  plans: I.List([
    I.Map({
      id: 'dummy_plan_jp_01',
      countryId: 'jp',
      title: 'Surprise Aunt Joy in her birthday',
      copy: 'Don’t forget the gift!',
      departure: oneWeekAgo,
      homecoming: oneDayAgo,
    }),
    I.Map({
      id: 'dummy_plan_jp_02',
      countryId: 'jp',
      title: 'Disneyland with cousins!',
      departure: inOneMonth,
      homecoming: inOneMonthAndQuarter,
    }),
    I.Map({
      id: 'dummy_plan_de_01',
      countryId: 'de',
      title: 'Ezhtellar team building',
      departure: oneWeekAgo,
      homecoming: today,
    }),
    I.Map({
      id: 'dummy_plan_de_02',
      countryId: 'de',
      title: 'Tony’s wedding',
      copy: 'That crystal duck would make a perfect gift',
      departure: inOneMonthAndQuarter,
      homecoming: inTwoMonths,
    }),
    I.Map({
      id: 'dummy_plan_gb_01',
      countryId: 'gb',
      title: 'UK dev conference',
      departure: inOneDay,
    }),
  ]),
  journals: I.List([
    I.Map({
      id: 'dummy_journal_jp_01',
      countryId: 'jp',
      title: 'Climbing Mt. Fuji!',
      copy: 'Double check your gears checklist a day before departure',
      departure: oneYearAgo,
      homecoming: oneYearandTwoWeeksAgo,
      photos: I.List([
        I.Map({
          id: 'dummy_journal_jp_01_photo_01',
          path: 'default/mt-fuji-jp-01_z4x3nn.jpg',
          description: 'This made me google why mountain roads are curved',
        }),
        I.Map({
          id: 'dummy_journal_jp_01_photo_02',
          path: 'default/mt-fuji-jp-02_krolra.jpg',
          description: 'At Fuji’s foot',
        }),
        I.Map({
          id: 'dummy_journal_jp_01_photo_03',
          path: 'default/mt-fuji-jp-03_zxv4rg.jpg',
        }),
      ]),
    }),
    I.Map({
      id: 'dummy_journal_eg_01',
      countryId: 'eg',
      title: 'Pyramids!',
      photos: I.List([
        I.Map({
          id: 'dummy_journal_eg_01_photo_01',
          path: 'default/pyramid-eg-01_zdu9jm.jpg',
        }),
        I.Map({
          id: 'dummy_journal_eg_01_photo_02',
          path: 'default/pyramid-eg-02_a4d8jg.jpg',
        }),
      ]),
    }),
    I.Map({
      id: 'dummy_journal_eg_02',
      countryId: 'eg',
      title: 'Luxor’s Karnak Temple and the Valley of the Kings',
      departure: inFifteenDays,
    }),
  ]),
})
