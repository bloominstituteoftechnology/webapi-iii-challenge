// Axios import
import axios from 'axios';
// Action imports
import { FETCH_USERS_SUCCESS, FETCH_POSTS_SUCCESS } from './types';

// Actions creators

// Will fetch the users from the server.
export const fetchUsers = () => dispatch => {
  axios.get('http://localhost:8000/api/users').then(response => {
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  });
};

export const fetchUsersPost = id => dispatch => {
  axios.get(`http://localhost:8000/api/users/${id}/posts`).then(response => {
    console.log(response);
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
  });
};
