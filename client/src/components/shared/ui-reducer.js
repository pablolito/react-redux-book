import { AT_UI } from '../actions-types'

const initialUiState = {
    scrollToSection: null,
    headerHeight: null,
    enableBacktotop: false
}

export default (state = initialUiState, action) => {
    switch (action.type) {
        case AT_UI.SCROLL_TO_SECTION:
            return {
                ...state, scrollToSection: action.payload
            }
            case AT_UI.SEND_HEADER_HEIGHT:
            return {
                ...state, headerHeight: action.payload
            }
            case AT_UI.ENABLE_BACKTOTOP:
            return {
                ...state, enableBacktotop: action.payload
            }
        default:
            return state;
    }
}