import { AT_PROFIL } from '../../actions-types'
import axios from 'axios'
import conf from '../../../conf'

const API = conf.API;

export const getProfil = () => {
    return function (dispatch) {
        axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries?access_token=${API.TOKEN}&content_type=profil`).then((response) => {
            dispatch({
                type: AT_PROFIL.READ_PROFIL,
                payload: response.data
            })
        })
    }
}