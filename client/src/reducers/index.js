import { FETCHING, FETCH_SUCCESS, FETCH_FAILURE } from "../actions";

const initialState = {
  users: [],
  isFetching: false,
  isFetched: false,
  hasError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        users: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        hasError: action.payload,
      };
    default:
      return state;
  }
};
