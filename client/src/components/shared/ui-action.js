import { AT_UI } from '../actions-types'

export const enableBacktotop = (isActive) => {
    return function (dispatch) {
        dispatch({
            type: AT_UI.ENABLE_BACKTOTOP,
            payload: isActive
        })
    }
}

