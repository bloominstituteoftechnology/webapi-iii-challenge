// Action imports
import { FETCH_POSTS_SUCCESS } from '../actions/types';

// Set initial state
const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return [action.payload];
    default:
      return state;
  }
};

export default postReducer;
