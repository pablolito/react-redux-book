import {AT_POST, AT_GLOBAL} from '../../actions-types'



export const postsListReducer = ( state=[], action) => {
    switch(action.type){
        case AT_GLOBAL.IS_LOADING :
        return {...state, isLoading: true}
        case AT_POST.READ_ALL_POST :
        return {...state, payload : action.payload, isInError:false, isLoading: false}
        case AT_GLOBAL.IS_IN_ERROR :
        return {...state, isInError: true, isLoading: false}
        default :
        return state
    }
}

export const filteredPostsListReducer = (state=[], action) => {
    switch(action.type){
        case AT_POST.READ_FILTERED_POST :
        return action.payload
        default :
        return state
    }
}


export const postReducer = (state=null, action) => {
    switch(action.type){
        case AT_POST.READ_POST :
        return action.payload
        default:
        return state;
    }
}

export const postAssetReducer = (state=null, action) => {
    switch(action.type){
        case AT_POST.GET_POST_ASSETS :
        return action.payload
        default:
        return state;
    }
}