import {AT_ABOUT} from '../../actions-types'

export default (state=null, action) => {
    switch(action.type){
        case AT_ABOUT.READ_EXPERIENCE_POSTS :
        return action.payload
        default:
        return state;
    }
}