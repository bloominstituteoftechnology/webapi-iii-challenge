import * as aliasName from '../actions';

const initialState = {
  fetchingUsers: false,
  users: [],
  error: null,
  activeUser: [],
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type){
    case aliasName.FETCH_USERS:
      return {
        ...state,
        fetchingUsers: true,
      };
    case aliasName.FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        users: action.payload,
      };
    case aliasName.FETCH_USERS_FAILURE:
      return {
        ...state,
        fetchingUsers: false,
        error: action.payload
      }
    default:
      return state
  }
}
