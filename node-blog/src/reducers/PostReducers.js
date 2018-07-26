import { GETTING_POSTS, 
    RECEIVED_POSTS, 
    GET_FAILED,
    GETTING_SINGLE_POST,
    RECEIVED_SINGLE_POST,
    GET_SINGLE_FAILED,
    CREATING_POST,
    POST_CREATED,
    CREATE_FAILED,
    UPDATING_POST,
    POST_UPDATED,
    UPDATE_FAILED,
    DELETING_POST,
    POST_DELETED,
    DELETE_FAILED,
    SEARCHING_POSTS,
    SEARCH_RETURNED,
    SEARCH_FAILED} from './../actions';



    const initialState = {
        posts: [],
        post: {},
        gettingPosts: false,
        receivedPosts: false,
        gettingPost: false,
        receivedPost: false,
        creatingPost: false,
        postCreated: false,
        updatingPost: false,
        postUpdated: false,
        deletingPost: false,
        postDeleted: false,
        searchingPosts: false,
        searchReturned: false,
        error: null
    }

    export const postReducers = (state = initialState, {type, payload}) => {
        switch(type){
            case GETTING_POSTS:
                return {...state, gettingPosts: true}
            case RECEIVED_POSTS:
                return {...state, gettingPosts: false, receivedPosts: true, posts: payload}
            case GET_FAILED:
                return {...state, gettingPosts: false, error: payload}

            case GETTING_SINGLE_POST:
                return {...state, gettingPost: true}
            case RECEIVED_SINGLE_POST:
                return {...state, gettingPost: false, gettingPost: true, post: payload}
            case GET_SINGLE_FAILED:
                return {...state, gettingPost: false, error: payload}

            case CREATING_POST:
                return {...state, creatingPost: true}
            case POST_CREATED:
                return {...state, creatingPost: false, postCreated: true}
            case CREATE_FAILED:
                return {...state, creatingPost: false, error: payload}

            case UPDATING_POST:
                return {...state, updatingPost: true}
            case POST_UPDATED:
                return {...state, updatingPost: false, postUpdated: true}
            case UPDATE_FAILED:
                return {...state, updatingPost: false, error: payload}

            case DELETING_POST:
                return {...state, deletingPost: true}
            case POST_DELETED:
                return {...state, deletingPost: false, postDeleted: true}
            case DELETE_FAILED:
                return {...state, deletingPost: false, error: payload}

            case SEARCHING_POSTS:
                return {...state, searchingPosts: true}
            case SEARCH_RETURNED:
                return {...state, searchingPosts: false, searchReturned: true, posts: payload}
            case SEARCH_FAILED:
                return {...state, searchingPosts: false, error: payload}

            default: 
                return state;
        }
    } 