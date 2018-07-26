import axios from 'axios';


export const GETTING_POSTS = 'GETTING_POSTS';
export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const GET_FAILED = 'GET_FAILED';

export const GETTING_SINGLE_POST = 'GETTING_SINGLE_POST';
export const RECEIVED_SINGLE_POST ='RECEIVED_SINGLE_POST';
export const GET_SINGLE_FAILED = 'GET_SINGLE_FAILED';

export const CREATING_POST = 'CREATING_POST';
export const POST_CREATED = 'POST_CREATED';
export const CREATE_FAILED = 'CREATE_FAILED';

export const UPDATING_POST = 'UPDATING_POST';
export const POST_UPDATED = 'POST_UPDATED';
export const UPDATE_FAILED = 'UPDATE_FAILED';

export const DELETING_POST = 'DELETING_POST';
export const POST_DELETED = 'POST_DELETED';
export const DELETE_FAILED = 'DELETE_FAILED';

export const SEARCHING_POSTS = 'SEARCHING_POSTS';
export const SEARCH_RETURNED = 'SEARCH_RETURNED';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const TOGGLE_UPDATE = 'TOGGLE_UPDATE';

export function getPosts () {
    return(dispatch) =>{
    dispatch({type: GETTING_POSTS});
    axios.get('http://localhost:8000/api/posts')
      .then(({data}) => {
          dispatch({type: RECEIVED_POSTS, payload: data});
      })
      .catch(err => {
          console.log(err);
          dispatch({type: GET_FAILED, error: err})
      })
    }
}

export function getSinglePost (id) {
    return(dispatch) =>{
    dispatch({type: GETTING_SINGLE_POST});
    axios.get(`http://localhost:8000/api/posts/${id}`)
      .then(({data}) => {
          console.log(data)
          dispatch({type: RECEIVED_SINGLE_POST, payload: data});
      })
      .catch(err => {
          console.log(err);
          dispatch({type: GET_SINGLE_FAILED, error: err})
      })
    }
}


export function createPost (newNote) {
    return(dispatch) =>{
    dispatch({type: CREATING_POST});
    axios.post('http://localhost:8000/api/posts', newNote)
      .then(({data}) => {
          console.log(data)
          dispatch({type: POST_CREATED, payload: data});
      })
      .catch(err => {
          console.log(err);
          dispatch({type: CREATE_FAILED, error: err})
      })
    }
}

export function updatePost (id, note) {
    return(dispatch) =>{
    dispatch({type: UPDATING_POST});
    axios.put(`http://localhost:8000/api/posts${id}`, note)
      .then(({data}) => {
          console.log(data)
          dispatch({type: POST_UPDATED, payload: data});
      })
      .catch(err => {
          console.log(err);
          dispatch({type: UPDATE_FAILED, error: err})
      })
    }
}

export function deletePost (id) {
    return(dispatch) =>{
    dispatch({type: DELETING_POST});
    axios.delete(`http://localhost:8000/api/posts/${id}`)
      .then(({data}) => {
          console.log(data)
          dispatch({type: POST_DELETED, payload: data});
      })
      .catch(err => {
          console.log(err);
          dispatch({type: DELETE_FAILED, error: err})
      })
    }
}

export function searchPosts (searchTerm) {
    return (dispatch) => {
        dispatch({type: SEARCHING_POSTS});
        axios.get(`http://localhost:8000/api/posts`)
        .then(({data}) => {
            console.log(data);
            let filtered = data.filter(note => {
                return note.textBody.includes(searchTerm.toLowerCase())
            })
            console.log(filtered);
            dispatch({type: SEARCH_RETURNED, payload: filtered})
        })
        .catch(err => {
            console.log(err);
            dispatch({type: SEARCH_FAILED})
        })
    }
}


export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    }
}

export const toggleDelete = () => {
    return {
        type: TOGGLE_DELETE
    }
}

export const toggleUpdate = () => {
    return {
        type: TOGGLE_UPDATE
    }
}

