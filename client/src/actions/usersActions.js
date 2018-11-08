import axios from 'axios';

import { FETCH_USERS } from './types';

const URL = 'http://localhost:5000/api/users';

export const fetchUsers = () => async dispatch => {
  const res = await axios.get(`${URL}`);
  dispatch({ type: FETCH_USERS, payload: res.data });
};
