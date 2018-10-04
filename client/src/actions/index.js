import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCHING_USERS_SUCCESS = "FETCHING_USERS_SUCCESS";
export const FETCHING_USER_POSTS = "FETCHING_USER_POSTS";
export const FETCHING_USER_POSTS_SUCCESS = "FETCHING_USER_POSTS_SUCCESS";
export const FETCHING_USER = "FETCHING_USER";
export const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";

const URL = "http://localhost:8000/users";
const postURL = "http://localhost:8000/posts";
const postsURL = "http://localhost:8000/userPosts";
const tagsURL = "http://localhost:8000/postTags";

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios.get(URL)
  .then(response => {
    dispatch({
      type: FETCHING_USERS_SUCCESS,
      payload: response.data,
    });
  });
};

export const fetchUser = id => dispatch => {
  dispatch({ type: FETCHING_USER });
  axios.get(`${URL}/${id}`)
  .then(response => {
    dispatch({ 
      type: FETCHING_USER_SUCCESS, 
      payload: response.data 
    });
  })
  .then(() => dispatch(fetchUserPosts(id)))
};

export const fetchUserPosts = id => dispatch => {
  dispatch({ type: FETCHING_USER_POSTS });
  axios.get(`${postsURL}/${id}`)
  .then(response => {
    dispatch({
      type: FETCHING_USER_POSTS_SUCCESS,
      payload: response.data,
    });
  });
};

