import {AT_ABOUT} from '../../actions-types'

export default (state={payload:null}, action) => {
    switch(action.type){
        case AT_ABOUT.IS_LOADING_EXPERIENCE_POSTS :
        return {...state, isLoading: true}
        case AT_ABOUT.READ_EXPERIENCE_POSTS :
        return {...state, payload: action.payload, isInError: false, isLoading: false}
        case AT_ABOUT.IS_IN_ERROR_EXPERIENCE_POSTS :
        return {...state, payload: action.payload, isInError: true, isLoading: false}
        default:
        return state;
    }
}