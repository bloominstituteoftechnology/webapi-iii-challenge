import {FETCHING_USERS, FETCHED_USERS, FETCHING_SINGLE_USER, FETCHED_SINGLE_USER, POSTING_USER, POSTED_USER, FETCHING_USER_POSTS, FETCHED_USER_POSTS} from '../actions/index';

import {FETCHING_POSTS, FETCHED_POSTS, POSTING_POST, POSTED_POST, FETCHING_SINGLE_POST, FETCHED_SINGLE_POST} from '../actions/index';

import {DELETING, DELETED, EDITING, EDITED, ERROR} from '../actions/index';

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
    userPosts: [],
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        // action reducers go here
        case FETCHING_POSTS:
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

        case POSTING_POST:
            return Object.assign({}, state, {
                posting: true
            })

        case POSTED_POST:
            return Object.assign({}, state, {
                posting: false, 
                posted: true
            })
        
        case FETCHING_SINGLE_POST:
            return Object.assign({}, state, {
                fetching_single: true
            })

        case FETCHED_SINGLE_POST:
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

        case FETCHING_USER_POSTS:  
            return Object.assign({}, state, {
                fetching: true
            })
        
        case FETCHED_USER_POSTS:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                userPosts: action.payload,
            })

        case FETCHING_SINGLE_USER:
            return Object.assign({}, state, {
                fetching: true
            })

        case FETCHED_SINGLE_USER:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                currentUser: action.payload
            })

        default:
            return state;
    }
}