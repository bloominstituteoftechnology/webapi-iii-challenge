import axios from 'axios';

// User actions
export const FETCHING_USERS = 'FETCHING USERS';
export const FETCHED_USERS = 'FETCHED USERS';
export const POSTING_USER = 'POSTING USER';
export const POSTED_USER = 'POSTED USER';
export const FETCHING_USER_POSTS = 'FETCHING USER POSTS';
export const FETCHED_USER_POSTS = 'FETCHED USER POSTS';
export const FETCHING_SINGLE_USER = 'FETCHING SINGLE USER';
export const FETCHED_SINGLE_USER = 'FETCHED SINGLE USER';
// Post actions
export const FETCHING_POSTS = 'FETCHING POSTS';
export const FETCHED_POSTS = 'FETCHED POSTS';
export const POSTING_POST = 'POSTING POST';
export const POSTED_POST = 'POSTED POST';
export const FETCHING_SINGLE_POST = 'FETCHING SINGLE POST';
export const FETCHED_SINGLE_POST = 'FETCHED SINGLE POST';


export const DELETING = 'DELETING';
export const DELETED = 'DELETED';

export const EDITING = 'EDITING';
export const EDITED = 'EDITED';


export const ERROR = 'ERROR';


/*** POSTS ACTIONS ***/

export const fetchPosts = () => {
    const fetchAll = axios.get(`http://localhost:8000/api/posts`);

    return dispatch => {
        dispatch({type: FETCHING_POSTS})

        fetchAll.then(res => {
            dispatch({type: FETCHED_POSTS, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const addPost = (post) => {
    const postRequest = axios.post(`http://localhost:8000/api/posts`, post);

    return dispatch => {
        dispatch({type: POSTING_POST})

        postRequest.then(res => {
            console.log(res);
            dispatch({type: POSTED_POST})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const fetchSinglePost = (id) => {
    const fetchSingleRequest = axios.get(`http://localhost:8000/api/posts/${id}`);

    return dispatch => {
        dispatch({type: FETCHING_SINGLE_POST})

        fetchSingleRequest.then(res => {
            dispatch({type: FETCHED_SINGLE_POST, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const deletePost = (id) => {
    const deleteRequest = axios.delete(`http://localhost:8000/api/posts/${id}`);

    return dispatch => {
        dispatch({type: DELETING})

        deleteRequest.then(res => {
            console.log(res);
            dispatch({type: DELETED})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const editPost = (id, newPost) => {
    const editRequest = axios.put(`http://localhost:8000/api/posts/${id}`, newPost);

    return dispatch => {
        dispatch({type: EDITING})

        editRequest.then(res => {
            console.log(res);
            dispatch({type: EDITED});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}


/*** USERS ACTIONS ***/

export const fetchUsers = () => {
    const fetchAllUsers = axios.get(`http://localhost:8000/api/users`);

    return dispatch => {
        dispatch({type: FETCHING_USERS})

        fetchAllUsers.then(res => {
            dispatch({type: FETCHED_USERS, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const addUser = (newUser) => {
    const addUserRequest = axios.post(`http://localhost:8000/api/users`, newUser);

    return dispatch => {
        dispatch({type: POSTING_USER})

    addUserRequest.then(res => {
        console.log(res.data);
        dispatch({type: POSTED_USER})
    }).catch(err => {
        console.log(err);
        dispatch({type: ERROR})
    })
}
}

export const fetchUserPosts = (id) => {
    const fetchUserPostsRequest = axios.get(`http://localhost:8000/api/users/${id}/posts`);

    return dispatch => {
        dispatch({type: FETCHING_USER_POSTS})

        fetchUserPostsRequest.then(res => {
            console.log(res.data);
            dispatch({type: FETCHED_USER_POSTS, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}