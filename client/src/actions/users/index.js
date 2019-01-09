import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHED_USERS = 'FETCHED_USERS';
export const FETCH_USER = 'FETCH_USER';
export const FETCHED_USER = 'FETCHED_USER';
export const CREATING_USER = 'CREATING_USER';
export const CREATED_USER = 'CREATED_USER';
export const FETCHING_USER_POSTS = 'FETCHING_USER_POSTS';
export const FETCHED_USER_POSTS = 'FETCHED_USER_POSTS';
export const ERROR = 'ERROR';

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
           dispatch({type: FETCHED_USER, payload: res.data})
         })
         .catch(err => {
           dispatch({type: ERROR, payload: err})
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
         .catch(err => {
           dispatch({type: ERROR, payload: err})
         })
  }
}

export const getUsersPosts = (id) => {
  return dispatch => {
    dispatch({type: FETCHING_USER_POSTS})

    axios.get(`http://localhost:3020/api/users/${id}/posts`)
         .then(posts => {
           dispatch({type: FETCHED_USER_POSTS, payload: posts.data.posts})
         })
         .catch(() => {
           dispatch({type: FETCHED_USER_POSTS, payload: []})
         })
  }
}
