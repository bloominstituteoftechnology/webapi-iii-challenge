import {FETCHING_USERS, FETCHING_USERS_SUCCESS, FETCHING_USER, FETCHING_USER_SUCCESS, FETCHING_USER_POSTS_SUCCESS} from '../actions'

const initialState = {
  currentUser: '',
  fetchingUser: false,
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
    case FETCHING_USER:
      return {
        ...state,
        fetchingUser: true
      }
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        currentUser: {...action.payload}
      }
    case FETCHING_USER_POSTS_SUCCESS:
      return {
        ...state,
        fetchingUser: false
      }
    default:
      return state;
  }
}