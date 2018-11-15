import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { postsReducer } from './postsReducer';
import { userReducer } from './userReducer'

export default combineReducers({ usersReducer, postsReducer, userReducer })
