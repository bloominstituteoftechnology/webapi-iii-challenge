import axios from 'axios';
import {
  FETCHING_USERS,
  USERS_FETCHED,
  FETCHING_USER_POSTS,
  USER_POSTS_FETCHED,
  ADDING_USER,
  USER_ADDED,
  USER_ERROR
} from '../constants/actionTypes';

export const getAllUsers = () => {
  const getUsers = axios.get('http://localhost:5000/api/users');
  return (dispatch) => {
    dispatch({ type: FETCHING_USERS });
    getUsers
      .then(response => {
        dispatch({
          type: USERS_FETCHED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: USER_ERROR,
          payload: err
        });
      });
  }
}

export const getPostsByUser = userId => {
  const getPostsByUserId = axios.get(`http://localhost:5000/api/users/${userId}/posts`);
  return (dispatch) => {
    dispatch({ type: FETCHING_USER_POSTS });
    getPostsByUserId
      .then(response => {
        dispatch({
          type: USER_POSTS_FETCHED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: USER_ERROR,
          payload: err
        });
      });
  }
}

export const createUser = userObj => {
  const createNewUser = axios.post('http://localhost:5000/api/users', userObj);
  return (dispatch) => {
    dispatch({ type: ADDING_USER });
    createNewUser
      .then(response => {
        dispatch({
          type: USER_ADDED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: USER_ERROR,
          payload: err
        });
      });
  }
}