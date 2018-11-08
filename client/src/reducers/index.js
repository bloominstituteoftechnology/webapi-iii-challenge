import { combineReducers } from 'redux';
// Reducer imports
import userReducer from './userReducer';

export default combineReducers({
  users: userReducer
});
