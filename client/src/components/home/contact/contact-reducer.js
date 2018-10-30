import {AT_CONTACT} from '../../actions-types'

export default (state=null, action) => {
    switch(action.type){
        case AT_CONTACT.SEND_CONTACT_FORM_LOADING :
        return {...state, isLoading:true}
        case AT_CONTACT.SEND_CONTACT_FORM :
        return {...state, reponseMsg: action.payload.data, isLoading:false}
        case AT_CONTACT.SEND_CONTACT_FORM_FAILURE :
        return {...state, errorMsg : action.payload.message, isLoading:false}
        default:
        return state;
    }
}