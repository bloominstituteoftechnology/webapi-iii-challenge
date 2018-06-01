import { combineReducers } from 'redux';
import { postReducer } from './postReducer';
import { tagReducer } from './tagReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  tags: tagReducer,
  users: userReducer
});

export default rootReducer;