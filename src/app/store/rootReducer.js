import blackjackReducer from '../blackjack/reducers/blackjackReducer'
import shellReducer from '../shell/reducers/shellReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    shellReducer,
    blackjackReducer
})

export default rootReducer