import axios from "axios";

// axios Methods
export const FETCHING = "FETCHING";
// axios outcomes
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

let usersURL = "http://localhost:8000/users/";

export const fetchUserData = () => {
  return function(dispatch) {
    dispatch({ type: FETCHING });
    axios
      .get(usersURL)
      .then(response =>
        dispatch({ type: FETCH_SUCCESS, payload: response.data }),
      )
      .catch(error => dispatch({ type: FETCH_FAILURE, payload: error }));
  };
};
