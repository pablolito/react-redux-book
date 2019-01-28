import {AT_POST, AT_GLOBAL} from '../../actions-types'

export const postsListReducer = ( state={payload: null, filter:''}, action) => {
    switch(action.type){
        case AT_POST.IS_LOADING_POSTS :
        return {...state, isLoading: true}
        case AT_POST.READ_POSTS :
        return {...state, payload : action.payload, isInError:false, isLoading: false}
        case AT_GLOBAL.IS_IN_ERROR :
        return {...state, isInError: true, isLoading: false}
        case AT_POST.CURRENT_FILTERED_POST :
        return {...state, filter: action.filter}
        default :
        return state
    }
}


export const postReducer = (state={payload: null, additionalAssets: null}, action) => {
    switch(action.type){
        case AT_POST.IS_LOADING_POST :
        return {...state, isLoading: true}
        case AT_POST.READ_POST :
        return {...state, payload : action.payload, isInError: false, isLoading: false}
        case AT_POST.GET_ADDITIONAL_ASSETS :
        return {...state, additionalAssets: action.additionalAssets}
        case AT_GLOBAL.IS_IN_ERROR :
        return {...state, payload: null, isInError: true, isLoading: false}
        default:
        return state;
    }
}