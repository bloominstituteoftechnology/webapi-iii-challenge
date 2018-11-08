import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

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
