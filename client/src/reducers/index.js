import { combineReducers } from 'redux';
// Reducer imports
import userReducer from './userReducer';
import postReducer from './postReducer';

export default combineReducers({
  users: userReducer,
  posts: postReducer
});
