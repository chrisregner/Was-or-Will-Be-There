import { combineReducers } from 'redux'
// import reduceReducers from 'reduce-reducers'

import plans from './plans'
import ui from './ui'

const rootReducer = combineReducers({ plans, ui })

export default rootReducer
