import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './rootReducer'

const middlewares = [thunk, createLogger()]

const initialState = undefined
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
)
export default store
