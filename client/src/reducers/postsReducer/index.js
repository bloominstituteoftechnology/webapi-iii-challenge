import { FETCHING_POSTS, FETCHED_POSTS } from '../../actions/posts';

const inititalState = {
  fetchingPosts: false,
  fetchedPosts: false,
  posts: [],
  error: false,
  errorMessage: null
}

const postsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCHING_POSTS:
      return Object.assign({}, state, {fetchingPosts: true, fetchedPosts: false})
    case FETCHED_POSTS:
      return Object.assign({}, state, {fetchingPosts: false, fetchedPosts: true, posts: action.payload})
    default:
      return state
  }
}

export default postsReducer;
