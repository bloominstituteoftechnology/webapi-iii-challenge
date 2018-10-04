import axios from "axios";
export const FETCHING_USERS = "FETCHING_USERS";
export const USERS_FETCHED = "USERS_FETCHED";
export const ERROR = "ERROR";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: FETCHING_USERS });
    axios
      .get("http://localhost:9000/api/users")
      .then(response => {
        console.log(response);
        dispatch({ type: USERS_FETCHED, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
};
