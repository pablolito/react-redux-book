import { AT_POST, AT_GLOBAL } from '../../actions-types'
import axios from 'axios'
import conf from '../../../conf'

const API = conf.API;

export const setFilterPosts = (filter) => {
    return function (dispatch) {
        dispatch({
            type: AT_POST.CURRENT_FILTERED_POST,
            filter: filter
        })
    }
}
export const getPosts = () => {
    return function (dispatch) {
        dispatch({ type: AT_POST.IS_LOADING_POSTS });
        axios.get(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries?access_token=${API.TOKEN}&content_type=book&order=-fields.year`).then((response) => {
            dispatch({
                type: AT_POST.READ_POSTS,
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
        dispatch({ type: AT_POST.IS_LOADING_POST });
        axios.get(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries/${id}?access_token=${API.TOKEN}`).then((response) => {
            const postData = response.data;
            axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/assets/${postData.fields.cover.sys.id}?access_token=${API.TOKEN}`).then((response) => {
                dispatch({
                    type: AT_POST.READ_POST,
                    payload: {
                        data: postData,
                        assetsData: response.data
                    }
                })
            }).catch((error) => {
                dispatch({
                    type: AT_GLOBAL.IS_IN_ERROR,
                    payload: null
                })
            })
        }).catch((error) => {
            dispatch({
                type: AT_GLOBAL.IS_IN_ERROR,
                payload: null
            })
        })
    }
}

export const getAdditionalAssets = (id) => {
    return function (dispatch) {
        axios(`${API.END_POINT}/spaces/${API.SPACE_ID}/entries/?access_token=${API.TOKEN}&content_type=book&fields.pictures.sys.id=${id}`).then((response) => {
            const orderedList = response.data.includes.Asset.sort(function (a, b) {
                    return (a.fields.title < b.fields.title) ? -1 : ((b.fields.title < a.fields.title) ? 1 : 0);
                  });
            dispatch({
                type: AT_POST.GET_ADDITIONAL_ASSETS,
                additionalAssets: orderedList
            })
        })
    }
}

export const resetPost = () => {
    return function (dispatch) {
        dispatch({
            type: AT_POST.READ_POST,
            payload: null,
        })
        dispatch({
            type: AT_POST.GET_ADDITIONAL_ASSETS,
            additionalAssets: null
        })
    }
}