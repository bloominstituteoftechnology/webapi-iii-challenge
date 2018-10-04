import { FETCHING_USERS, USERS_FETCHED, ERROR } from "../actions";

const initialState = {
  fetchingUsers: false,
  usersFetched: false,
  error: null,
  userList: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return Object.assign({}, state, { fetchingUsers: true });
    case USERS_FETCHED:
      return Object.assign({}, state, {
        userList: action.payload,
        fetchingUsers: false,
        usersFetched: true
      });
    case ERROR:
      return Object.assign({}, state, {
        fetchingUsers: false,
        error: action.payload
      });
    default:
      return state;
  }
};
