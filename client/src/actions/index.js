import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const url = 'http://localhost:9000/users';

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCH_USERS });
  axios
    .get(url)
    .then(response => {
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error })
    })
};

export const fetchPosts = id => dispatch => {
  dispatch({ type: FETCH_POSTS })
  axios
    .get(`${url}/${id}/posts`)
    .then(response => {
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_POSTS_FAILURE, payload: error })
    })
}

export const fetchUserById = id => dispatch => {
  axios
    .get(`${url}/${id}`)
    .then(response => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_USER_FAILURE, payload: error})
    })
}
