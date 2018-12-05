import { FETCHING_USERS, FETCHED_USERS, CREATING_USER, CREATED_USER,
         FETCH_USER, FETCHED_USER } from '../../actions/users';

const inititalState = {
  fetchingUsers: false,
  fetchedUsers: false,
  fetchingUser: false,
  fetchedUser: false,
  creatingUser: false,
  createdUser: false,
  updatingUser: false,
  updatedUser: false,
  deletingUser: false,
  deletedUser: false,
  users: [],
  error: null,
  profile: {},
  currentProfileView: {}
}

const usersReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return Object.assign({}, state, {fetchedUsers: false, fetchingUsers: true})
    case FETCHED_USERS:
      return Object.assign({}, state, {fetchingUsers: false, fetchedUsers: true,
                                       users: action.payload})
    case CREATING_USER:
      return Object.assign({}, state, {createdUser: false, creatingUser: true})
    case CREATED_USER:
      return Object.assign({}, state, {creatingUser: false, createdUser: true,
                                       profile: action.paylaod})
    case FETCH_USER:
      return Object.assign({}, state, {fetchedUser: false, fetchUser: true})
    case FETCHED_USER:
      return Object.assign({}, state, {fetchUser: false, fetchedUser: true,
                                       currentProfileView: action.payload})
    default:
      return state
  }
}

export default usersReducer;
