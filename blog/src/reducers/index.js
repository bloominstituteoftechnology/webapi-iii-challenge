// Imports
import {
    combineReducers
} from 'redux'

// Reducer Imports
import PostReducer from './postReducer';
import UserReducer from './userReducer';


// Initial State
export default combineReducers({
    PostReducer,
    UserReducer
})