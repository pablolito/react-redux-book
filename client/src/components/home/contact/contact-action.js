import { AT_CONTACT } from '../../actions-types'
import axios from 'axios'

export const sendContactForm = (contact) => {
    return function (dispatch) {
            dispatch({ type: AT_CONTACT.SEND_CONTACT_FORM_LOADING });
            axios.post('api/contact', contact)
              .then(function (response) {
                dispatch({
                    type: AT_CONTACT.SEND_CONTACT_FORM,
                    payload: response
                })
              })
              .catch(function (error) {
                dispatch({
                    type: AT_CONTACT.SEND_CONTACT_FORM_FAILURE,
                    payload: error
                })
              });
            
        
    }
}