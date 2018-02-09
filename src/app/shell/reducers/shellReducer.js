import Immutable from 'immutable'

import * as types from '../../constants/actionTypes'
import { paths } from '../../constants/constants'

let initialState = Immutable.Map({})

export default function shellReducer(state = initialState, action = undefined) {
    let newState = state

    switch (action.type) {
        case types.SHOW_ERROR_DIALOG:
            newState = newState.setIn(paths.errorMessage, action.errorMessage)
            return newState
        case types.CLEAR_ERROR_MESSAGE:
            newState = newState.deleteIn(paths.errorMessage)
            return newState
    }
    return newState
}
