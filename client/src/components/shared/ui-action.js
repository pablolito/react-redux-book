import { AT_UI } from '../actions-types'

export const goToSection = (sectionId) => {
    return function (dispatch) {
        dispatch({
            type: AT_UI.SCROLL_TO_SECTION,
            payload: sectionId
        })
    }
}
export const sendHeaderHeight = (headerHeight) => {
    return function (dispatch) {
        dispatch({
            type: AT_UI.SEND_HEADER_HEIGHT,
            payload: headerHeight
        })
    }
}

export const enableBacktotop = (isActive) => {
    return function (dispatch) {
        dispatch({
            type: AT_UI.ENABLE_BACKTOTOP,
            payload: isActive
        })
    }
}

