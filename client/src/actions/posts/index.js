import axios from 'axios';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCHED_POSTS = 'FETCHED_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const CREATED_POST = 'CREATED_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCHED_POST = 'FETCHED_POST';
export const ERROR = 'ERROR';

export const getPosts = () => {
  return dispatch => {
    dispatch({type: FETCHING_POSTS})

    axios.get('http://localhost:3020/api/posts')
         .then(res => {
           dispatch({type: FETCHED_POSTS, payload: res.data.posts})
         })
         .catch(err => {
           console.log(err)
         })
  }
}

export const fetchPost = (id) => {
  return dispatch => {
    dispatch({type: FETCH_POST})

    axios.get(`http://localhost:3020/api/posts/${id}`)
         .then(res => {
           dispatch({type: FETCHED_POST, payload: res.data.post})
         })
         .catch(err => {
           console.log(err)
         })
  }
}

export const createPost = (post) => {
  return dispatch => {
    dispatch({type: CREATE_POST, payload: post})

    axios.post('http://localhost:3020/api/posts', {...post})
         .then(res => {
           dispatch({type: CREATED_POST, payload: res.data.post})
         })
  }
}
