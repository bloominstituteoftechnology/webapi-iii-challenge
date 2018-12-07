import { FETCHING_POSTS, FETCHED_POSTS, FETCH_POST, FETCHED_POST,
         CREATED_POST, CREATE_POST} from '../../actions/posts';

const inititalState = {
  fetchingPosts: false,
  fetchedPosts: false,
  fetchPost: false,
  fetchedPost: false,
  creatingPost: false,
  createdPost: false,
  posts: [],
  error: false,
  errorMessage: null,
  currentPost: []
}

const postsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCHING_POSTS:
      return Object.assign({}, state, {fetchingPosts: true, fetchedPosts: false, createdPost: false})
    case FETCHED_POSTS:
      return Object.assign({}, state, {fetchingPosts: false, fetchedPosts: true, posts: action.payload.reverse(), createdPost: false})
    case FETCH_POST:
      return Object.assign({}, state, {fetchPost: true, fetchedPost: false})
    case FETCHED_POST:
      return Object.assign({}, state, {fetchPost: false, fetchedPost: true,
                                       currentPost: action.payload})
    case CREATE_POST:
      return Object.assign({}, state, {createPost: true, createdPost: false})
    case CREATED_POST:
      return Object.assign({}, state, {createPost: false, createdPost: true})
    default:
      return state
  }
}

export default postsReducer;
