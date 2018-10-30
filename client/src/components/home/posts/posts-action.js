import { AT_POST, AT_GLOBAL } from '../../actions-types'
import axios from 'axios'
import conf from '../../../conf'

const API = conf.API;

export const getALLPosts = () => {
    return function (dispatch) {
        dispatch({ type: AT_GLOBAL.IS_LOADING });
        axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries?access_token=${API.TOKEN}&content_type=book`).then((response) => {
            dispatch({
                type: AT_POST.READ_ALL_POST,
                payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: AT_GLOBAL.IS_IN_ERROR,
                payload: error
            })
        });
    }
}

export const getPost = (id) => {
    return function (dispatch) {
        axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries/${id}?access_token=${API.TOKEN}`).then((response) => {
            dispatch({
                type: AT_POST.READ_POST,
                payload: response.data
            })
            axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/assets/${response.data.fields.pictures[0].sys.id}?access_token=${API.TOKEN}`).then((response) => {
                dispatch({
                    type: AT_POST.GET_POST_ASSETS,
                    payload: response.data
                })
            })
        })
    }
}
export const resetPost = () => {
    return function (dispatch) {
        dispatch({
            type: AT_POST.READ_POST,
            payload: null
        })
        dispatch({
            type: AT_POST.GET_POST_ASSETS,
            payload: null
        })
    }

}

export const getFilteredPosts = (postsListItems, id) => {

    const filteredPost = postsListItems.filter((post) => {
        if (post.fields.tags.indexOf(id) !== -1) {
            return true
        } else {
            return false
        }
    })

    return function (dispatch) {
        dispatch({
            type: AT_POST.READ_FILTERED_POST,
            payload: {
                filterPost: filteredPost,
                currentFilterId: id
            }
        })
    }
}