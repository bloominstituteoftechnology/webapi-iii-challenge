import {FETCHING_USER_POSTS_SUCCESS, FETCHING_USER_POSTS} from '../actions'

const initialState = {
  posts: [],
  fetchingPosts: false
}

export const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_USER_POSTS:
      return {
        ...state,
        fetchingPosts: true
      }
    case FETCHING_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload],
        fetchingPosts: false
      }
    default:
      return state;
  }
}