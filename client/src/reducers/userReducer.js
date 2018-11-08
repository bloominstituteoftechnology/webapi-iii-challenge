// Action imports
import { FETCH_USERS_SUCCESS } from '../actions/types';

// Creates and initial state to empty array
const initialState = [];

// Creates reducer to handle the users
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fills state with the users
    case FETCH_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
