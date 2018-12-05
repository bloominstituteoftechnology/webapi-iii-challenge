import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHED_USERS = 'FETCHED_USERS';
export const FETCH_USER = 'FETCH_USER';
export const FETCHED_USER = 'FETCHED_USER';
export const CREATING_USER = 'CREATING_USER';
export const CREATED_USER = 'CREATED_USER';

export const fetchUsers = () => {
  return dispatch => {
    dispatch({type: FETCHING_USERS})

    axios.get('http://localhost:3020/api/users')
         .then(res => {
           dispatch({type: FETCHED_USERS, payload: res.data.users})
         })
         .catch(err => {
           console.log(err)
         })
  }
}

export const getUser = (id) => {
  return dispatch => {
    dispatch({type: FETCH_USER})

    axios.get(`http://localhost:3020/api/users/${id}`)
         .then(res => {
           console.log(res)
           dispatch({type: FETCHED_USER, payload: res.data})
         })
         .catch(err => {
           console.log(err)
         })
  }
}

export const createUser = (obj) => {
  return dispatch => {
    dispatch({type: CREATING_USER})

    axios.get('http://localhost:3020/api/users')
         .then(res => {
           dispatch({type: CREATED_USER, payload: res.data.users})
         })
  }
}
