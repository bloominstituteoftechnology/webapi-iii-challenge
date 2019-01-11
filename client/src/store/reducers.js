import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  USER_POSTS
} from "./actions";

const initialState = {
  users: [],
  posts: [],
  userPosts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };

    case USER_POSTS:
      return {
        ...state,
        userPosts: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
