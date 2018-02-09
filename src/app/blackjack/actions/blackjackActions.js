import * as types from '../../constants/actionTypes'

export function fetchInProgress(isInProgress) {
    return {
        type: types.IS_FETCH_IN_PROGRESS,
        isInProgress
    }
}

export function deal() {
    return {
        type: types.DEAL
    }
}
export function hit() {
    return {
        type: types.HIT
    }
}
export function stick() {
    return {
        type: types.STICK
    }
}