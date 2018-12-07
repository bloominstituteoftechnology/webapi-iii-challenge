import axios from 'axios';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCHED_POSTS = 'FETCHED_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const CREATED_POST = 'CREATED_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCHED_POST = 'FETCHED_POST';
export const DELETING_POST = 'DELETING_POST';
export const DELETED_POST = 'DELETED_POST';
export const UPDATING_POST = 'UPDATING_POST';
export const UPDATED_POST = 'UPDATED_POST';

export const ERROR = 'ERROR';

export const getPosts = () => {
  return dispatch => {
    dispatch({type: FETCHING_POSTS})

    axios.get('http://localhost:3020/api/posts')
         .then(res => {
           dispatch({type: FETCHED_POSTS, payload: res.data.posts})
         })
         .catch(err => {
           dispatch({type: ERROR, payload: err})
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
           dispatch({type: ERROR, payload: err})
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
         .catch(err => {
           dispatch({type: ERROR, payload: err})
         })
  }
}

export const deletePost = (id) => {
  return dispatch => {
    dispatch({type: DELETING_POST, payload: id})

    axios.delete(`http://localhost:3020/api/posts/${id}`)
         .then(res => {
           dispatch({type:DELETED_POST, payload: res.data})
         })
         .catch(err => {
           dispatch({type: ERROR, payload: err})
         })
  }
}

export const updatePost = (id, obj) => {
  return dispatch => {
    dispatch({type: UPDATING_POST, payload: obj})

    axios.put(`http://localhost:3020/api/posts/${id}`, obj)
         .then(res => {
           dispatch({type: UPDATED_POST, payload: res.data})
         })
         .catch(err => {
           dispatch({type: ERROR, payload: err})
         })
  }
}
