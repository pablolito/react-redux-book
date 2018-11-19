import { AT_UI } from '../actions-types'

const initialUiState = {
    enableBacktotop: false
}

export default (state = initialUiState, action) => {
    switch (action.type) {
        case AT_UI.ENABLE_BACKTOTOP:
            return {
                ...state, enableBacktotop: action.payload
            }
        default:
            return state;
    }
}