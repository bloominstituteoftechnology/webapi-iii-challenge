const msg = {
    GET_ALL_ERR: { error: 'The users could not be retrieved.' },
    GET_ONE_ERR: { error: 'The user with the specified ID could not be retrieved.' },
    NOT_FOUND: { error: 'The user with the specified ID does not exist.' },
    USER_POSTS_ERR: { error: 'The posts for this user could not be retrieved.' },
    DELETE_ERR: { error: 'The user with the specified ID could not be removed.' },
    DELETE_MSG: { message: 'The user was removed successfully.' },
    NO_NAME: { errorMessage: 'Please provide a name.' },
    CHAR_EXCEEDED: { errorMessage: 'Please provide a name shorter than 128 characters.' },
    POST_ERR: { error: 'There was an error creating the user.' },
    PUT_ERR: { error: 'The user was unable to be updated.' },
    PUT_MSG: { message: 'The user was updated successfully.' },
}

module.exports = msg;