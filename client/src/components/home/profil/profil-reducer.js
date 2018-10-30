import {AT_PROFIL} from '../../actions-types'

export default (state=null, action) => {
    switch(action.type){
        case AT_PROFIL.READ_PROFIL :
        return action.payload
        default:
        return state;
    }
}