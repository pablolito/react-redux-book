import {AT_PROFIL} from '../../actions-types'

export default (state={payload:null}, action) => {
    switch(action.type){
        case AT_PROFIL.IS_LOADING_PROFIL :
        return {...state, isLoading: true}
        case AT_PROFIL.READ_PROFIL :
        return {...state, payload: action.payload, isInError: false, isLoading: false}
        case AT_PROFIL.IS_IN_ERROR_PROFIL :
        return {...state, payload: action.payload, isInError: true, isLoading: false}
        default:
        return state;
    }
}