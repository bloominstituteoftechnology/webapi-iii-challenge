import * as aliasName from '../actions'

const initialState = {
  fetchingPosts: false,
  posts: [],
  error: null,
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case aliasName.FETCH_POSTS:
      return {
        ...state,
        fetchingPosts: true,
      }
    case aliasName.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        posts: action.payload
      }
    case aliasName.FETCH_POSTS_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        error: action.payload
      }
    case aliasName.CLEAR_ERROR:
      return {
        ...state,
        error: null, 
      }
    default:
      return state
  }
}
