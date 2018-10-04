import {FETCHING, FETCHED_POSTS, FETCHED_USERS, POSTING, POSTED_POST, POSTED_USER, FETCHING_SINGLE, FETCHED_SINGLE, EDITING, EDITED, DELETING, DELETED, ERROR} from '../actions/index';

const initialState = {
    fetching: false,
    fetched: false,
    fetching_single: false,
    fetched_single: false,
    posting: false,
    posted: false,
    editing: false,
    edited: false,
    deleting: false,
    deleted: false,
    error: false,
    posts: [],
    users: [],
    currentPost: {},
    currentUser: {},
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        // action reducers go here
        case FETCHING:
            return Object.assign({}, state, {
                fetching: true
            })
        
        case FETCHED_POSTS:
            return Object.assign({}, state, {
                fetching: false, 
                fetched: true, 
                posts: action.payload,
                currentPost: {}
            })

        case FETCHED_USERS:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                users: action.payload,
                currentUser: {}
            })

        case POSTING:
            return Object.assign({}, state, {
                posting: true
            })

        case POSTED_POST:
            return Object.assign({}, state, {
                posting: false, 
                posted: true
            })
        
        case FETCHING_SINGLE:
            return Object.assign({}, state, {
                fetching_single: true
            })

        case FETCHED_SINGLE:
            return Object.assign({}, state, {
                fetching_single: false,
                fetched_single: true,
                currentPost: action.payload
            })

        case DELETING:
            return Object.assign({}, state, {
                deleting: true
            })

        case DELETED:
            return Object.assign({}, state, {
                deleting: false,
                deleted: true
            })

        case EDITING:
            return Object.assign({}, state, {
                editing: true
            })

        case EDITED:
            return Object.assign({}, state, {
                editing: false,
                edited: true,       
            })

        case POSTED_USER:
            return Object.assign({}, state, {
                posting: false,
                posted: true
            })

        default:
            return state;
    }
}