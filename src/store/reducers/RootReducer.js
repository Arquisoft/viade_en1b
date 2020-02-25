import {combineReducers} from 'redux'
import authReducer from './authReducer'
import routeReducer from './routeReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    route: routeReducer
})

export default rootReducer