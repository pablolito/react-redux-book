import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import {postsListReducer, filteredPostsListReducer, postReducer} from './home/posts/post-reducer'
import sendContactReducer from './home/contact/contact-reducer'
import uiReducer from './shared/ui-reducer'
import profilReducers from './home/profil/profil-reducer'
import aboutReducers from './home/about/about-reducer'

export default combineReducers({
  ui: uiReducer,
  postsList: postsListReducer,
  post: postReducer,
  filteredPostsList: filteredPostsListReducer,
  profil: profilReducers,
  about: aboutReducers,
  form: formReducer,
  sendContact : sendContactReducer
})