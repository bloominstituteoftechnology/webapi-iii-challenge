import { postReducers } from './PostReducers';
//import { toggleReducers } from './ToggleReducers';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    posts: postReducers
})
