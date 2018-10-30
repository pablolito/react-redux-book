import { AT_ABOUT } from '../../actions-types'
import axios from 'axios'
import conf from '../../../conf'

const API = conf.API;

export const getExperiencePosts = () => {
    return function (dispatch) {
        axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries?access_token=${API.TOKEN}&content_type=expertise`).then((response) => {
            dispatch({
                type: AT_ABOUT.READ_EXPERIENCE_POSTS,
                payload: response.data
            })
        })
    }
}