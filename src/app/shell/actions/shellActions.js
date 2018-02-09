import * as types from '../../constants/actionTypes'

export function showErrorDialog(errorMessage) {
    return {
        type: types.SHOW_ERROR_DIALOG,
        errorMessage
    }
}

export function clearErrorMessage() {
    return {
        type: types.CLEAR_ERROR_MESSAGE
    }
}