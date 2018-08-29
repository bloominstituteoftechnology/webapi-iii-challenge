import {FETCHING_USERS, FETCHING_USERS_SUCCESS} from '../actions/usersActions'

const initialState = {
  fetchingUsers: false,
  users: []
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return {
        ...state,
        fetchingUsers: true
      };
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        users: [...action.payload]
      }
    default:
      return state;
  }
}