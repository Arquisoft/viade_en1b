import {combineReducers} from 'redux'
import authReducer from './AuthReducer'
import routeReducer from './RouteReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    route: routeReducer
})

export default rootReducer