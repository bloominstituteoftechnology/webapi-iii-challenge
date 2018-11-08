// Axios import
import axios from 'axios';
// Action imports
import { FETCH_USERS_SUCCESS } from './types';

// Actions creators

// Will fetch the users from the server.
export const fetchUsers = () => dispatch => {
  axios.get('http://localhost:8000/api/users').then(response => {
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  });
};
