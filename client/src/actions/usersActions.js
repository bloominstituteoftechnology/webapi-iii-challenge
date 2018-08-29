import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCHING_USERS_SUCCESS = "FETCHING_USERS_SUCCESS";

const URL = "http://localhost:8000/users";

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios
    .get(URL)
    .then(response => {
      dispatch({
        type: FETCHING_USERS_SUCCESS,
        payload: response.data
      })
    })
}