import { AT_UI } from '../actions-types'

const initialUiState = {
    headerHeight: null,
    enableBacktotop: false
}

export default (state = initialUiState, action) => {
    switch (action.type) {
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