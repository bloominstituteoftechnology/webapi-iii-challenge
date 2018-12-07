import { FETCHING_POSTS, FETCHED_POSTS, FETCH_POST, FETCHED_POST,
         CREATED_POST, CREATE_POST, DELETED_POST, DELETING_POST, ERROR} from '../../actions/posts';

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
      return Object.assign({}, state, {fetchingPosts: true, fetchedPosts: false, createdPost: false, deletedPost: false})
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
    case DELETING_POST:
      return Object.assign({}, state, {deletingPost: true, deletedPost: false})
    case DELETED_POST:
      return Object.assign({}, state, {deletingPost: false, deletedPost: true})
    case ERROR:
      return Object.assign({}, state, {error: true, errorMessage: action.paylaod})
    default:
      return state
  }
}

export default postsReducer;
