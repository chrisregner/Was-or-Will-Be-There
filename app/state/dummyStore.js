import D from 'date-fns'
import I from 'immutable'

const today = new Date()
const todayMidnight = new Date(
  D.getYear(today),
  D.getMonth(today),
  D.getDate(today),
  0, 0, 0, 0
)

const inOneMonth = D.addDays(todayMidnight, 30)
const inOneYear = D.addDays(todayMidnight, 365)
const inOneYearAndHalf = D.addDays(todayMidnight, 548)

const oneDayAgo = D.subDays(todayMidnight, 1)
const oneMonthAgo = D.subDays(todayMidnight, 30)
const oneYearAgo = D.subDays(todayMidnight, 365)
const oneYearAndHalfAgo = D.subDays(todayMidnight, 548)

export default I.Map({
  plans: I.List([
    I.Map({
      id: 'plan1',
      countryId: 'jp',
      planName: 'Surprise Tita on her birthday!',
      notes: 'Buy some Filipino souvenir for her',
      departure: inOneMonth,
    }),
    I.Map({
      id: 'plan2',
      countryId: 'us',
      planName: 'DevConf',
      notes: 'Don’t forget the notes',
      departure: inOneYear,
      homecoming: inOneYearAndHalf,
    }),
    I.Map({
      id: 'plan3',
      countryId: 'us',
      planName: 'Meeting with Trump',
      departure: todayMidnight,
    }),
    I.Map({
      id: 'plan4',
      countryId: 'us',
      planName: 'I was there a month ago',
      homecoming: oneMonthAgo,
    }),
    I.Map({
      id: 'plan5',
      countryId: 'jp',
      planName: 'I’m here today',
      homecoming: todayMidnight,
    }),
    I.Map({
      id: 'plan6',
      countryId: 'no',
      planName: 'I was there yesterday',
      homecoming: oneDayAgo,
    }),
  ]),
  journals: I.List([
    I.Map({
      id: 'journal1',
      countryId: 'jp',
      title: 'Visit my old home',
      text: 'It is renovated and is for sale ',
      homecoming: oneMonthAgo,
    }),
    I.Map({
      id: 'journal2',
      countryId: 'no',
      title: 'Visit my girlfriend',
      text: 'Don’t forget the gift!',
      departure: oneYearAgo,
      homecoming: oneYearAndHalfAgo,
    }),
    I.Map({
      id: 'journal3',
      countryId: 'ru',
      title: 'Meeting with Putin',
      homecoming: oneDayAgo,
    }),
    I.Map({
      id: 'journal4',
      countryId: 'ru',
      title: 'Take a break from work',
      homecoming: oneDayAgo,
    }),
  ]),
})
