// Node Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Database Helpers
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();

server.use(express.json(), cors(), morgan('combined'), helmet());

// ##### Custom Middleware #####

// Intended to ensure that a user's name is uppercase before 
// the request reaches CREATE or UPDATE user endpoints.
const toUpperCase = (request, response, next) => {
    request.name = request.body.name.toUpperCase();
    next();
}


///// ===============- SERVER CRUD ENDPOINTS -===============

// ##### Error Messages #####

// USER Errors
const missingUserName = { errorMessage: "Please provide a name for the user." }
const userNotFound = { errorMessage: "The user with the specified ID does not exist." }
const postsNotFoundForUser = { errorMessage: "No posts for the user with the specified ID exist." }
const noUsersUpdated = { errorMessage: "No users were updated." }
const noUsersDeleted = { errorMessage: "No users were deleted." }
const unableToFindSingleUser500 = { errorMessage: "The user information could not be retrieved." }
const unableToFindUsers500 = { errorMessage: "Unable to retrieve users." }
const unableToCreateUser500 = { errorMessage: "Unable to create user." }
const unableToUpdateUser500 = { errorMessage: "Unable to update user." }
const unableToDeleteUser500 = { errorMessage: "Unable to delete user." }
const unableToFindPostsForUser500 = { errorMessage: "Unable to retrieve posts for the specified user." }


// POST Errors
const missingPostData = { errorMessage: "Please provide some text for the post." }
const postNotFound = { errorMessage: "The post with the specified ID does not exist." }
const noPostsUpdated = { errorMessage: "No posts were updated." }
const noPostsDeleted = { errorMessage: "No posts were deleted." }
const unableToFindSinglePost500 = { errorMessage: "The post information could not be retrieved." }
const unableToFindPosts500 = { errorMessage: "Unable to retrieve posts." }
const unableToCreatePost500 = { errorMessage: "Unable to create post." }
const unableToUpdatePost500 = { errorMessage: "Unable to update post." }
const unableToDeletePost500 = { errorMessage: "Unable to delete post." }


//// ==========- USER DATABASE CRUD ENDPOINTS -==========

/// #####=- Root Server READ Endpoint -=#####
server.get('/', (request, response) => {
    response.status(200).send(`It's working!`);
});

/// #####=- READ All Users Endpoint -=#####
server.get('/users', (request, response) => {

    // Database Promise Method
    userDb.get()
    .then(users => response.status(200).send(users))
    .catch(() => response.status(500).send(unableToFindUsers500))
});

/// #####=- READ Individual User Endpoint -=#####
server.get('/users/:userId', (request, response) => {

    const userId = request.params.userId;

    // Database Promise Method
    userDb.get(userId)
    .then(user => {
        if (!user) {
            response.status(400).send(userNotFound)
        }
        response.status(200).send(user)
    })
    .catch(() => response.status(500).send(unableToFindSingleUser500))
});

/// #####=- CREATE Individual User Endpoint -=#####
server.post('/users', toUpperCase,  (request, response) => {

    // Request Validation
    const name = request.name;
    
    if ( !name ) {
        response.status(400).send(missingUserName);
    }

    // Database Promise Method
    userDb.insert({'name': name})
    .then( userId => {
        userDb.get(userId.id)
        .then(user => {
            if (!user) {
                response.status(400).send(userNotFound)
            }
            response.status(200).send(user)
        })
        .catch(() => response.status(500).send(unableToFindSingleUser500))
    })
    .catch(() => response.status(500).send(unableToCreateUser500))
});

/// #####=- UPDATE Individual User Endpoint -=#####
server.put('/users/:userId', toUpperCase, (request, response) => {

    // Request Validation
    const userId = request.params.userId;

    const name = request.name;

    if ( !name ) {
        response.status(400).send(missingUserName);
    }

    // Database Promise Method
    userDb.update(userId, {'name': name})
    .then( didUpdate => {
        if (!didUpdate) {
            response.status(400).send(noUsersUpdated)
        }

        userDb.get(userId)
        .then(user => {
            if (!user) {
                response.status(400).send(userNotFound)
            }
            response.status(200).send(user)
        })
        .catch(() => response.status(500).send(unableToFindSingleUser500))
    })
    .catch(() => response.status(500).send(unableToUpdateUser500))
});

/// #####=- DELETE Individual User Endpoint -=#####
server.delete('/users/:userId', (request, response) => {

    const userId = request.params.userId;

    // Database Promise Method
    userDb.get(userId)
    .then(user => {
        if (!user) {
            response.status(400).send(userNotFound)
        }

        userDb.remove(userId)
        .then( didDelete => {
            if(!didDelete) {
                response.status(400).send(noUsersDeleted)
            }
            response.status(200).send(user) 
        })
        .catch(() => response.status(500).send(unableToDeleteUser500))
    })
    .catch(() => response.status(500).send(unableToFindSingleUser500))
})

/// #####=- READ All Posts of Individual User Endpoint -=#####
server.get('/users/:userId/posts', (request, response) => {

    const userId = request.params.userId;

    // Database Promise Method
    userDb.getUserPosts(userId)
    .then(posts => {
        if (!posts.length) {
            response.status(400).send(postsNotFoundForUser)
        }
        response.status(200).send(posts)
    })
    .catch(() => response.status(500).send(unableToFindPostsForUser500))
})

//// ==========- POST DATABASE CRUD ENDPOINTS -==========

/// #####=- READ All Posts Endpoint -=#####
server.get('/posts', (request, response) => {

    // Database Promise Method
    postDb.get()
    .then(posts => response.status(200).send(posts))
    .catch(() => response.status(500).send(unableToFindPosts500))
});

/// #####=- READ Individual Post Endpoint -=#####
server.get('/posts/:postId', (request, response) => {

    const postId = request.params.postId;

    // Database Promise Method
    postDb.get(postId)
    .then(post => {
        if (!post) {
            response.status(400).send(postNotFound)
        }
        response.status(200).send(post)
    })
    .catch(() => response.status(500).send(unableToFindSinglePost500))
});

/// #####=- CREATE Individual Post Endpoint -=#####
server.post('/users/:userId/posts', (request, response) => {

    // Request Validation
    const userId = request.params.userId;

    // Destructuring Request Body For Validation
    const { text } = request.body;

        
    if ( !text ) {
        response.status(400).send(missingPostData);
    }

    // Database Promise Method
    userDb.get(userId)
    .then(() => {})
    .catch(() => response.status(500).send(unableToFindSingleUser500))

    // Include postDb.insert in userDB.get promise later. Won't work currently for some reason.
    postDb.insert({'userId': userId,'text': text})
        .then( postId => {
            postDb.get(postId.id)
            .then(post => {
                if (!post) {
                    response.status(400).send(postNotFound)
                }
                response.status(200).send(post)
            })
            .catch(() => response.status(500).send(unableToFindSinglePost500))
        })
        .catch(() => response.status(500).send(unableToCreatePost500));
});

/// #####=- UPDATE Individual Post Endpoint -=#####
server.put('/posts/:postId', (request, response) => {

    // Request Validation
    const postId = request.params.postId;

    // Destructuring Request Body For Validation
    const { userId, text } = request.body;
    const user = {};

    if ( !text || !userId ) {
        response.status(400).send(missingPostData);
    }

    if ( text ) {
        user.text = text;
    }

    if ( userId ) {
        user.userId = userId;
    }

    // Database Promise Method
    postDb.update(postId, {...user})
    .then( didUpdate => {

        if (!didUpdate) {
            response.status(400).send(noPostsUpdated)
        }

        postDb.get(postId)
            .then(post => {
                if (!post) {
                    response.status(400).send(postNotFound)
                }
                response.status(200).send(post)
            })
            .catch(() => response.status(500).send(unableToFindSinglePost500))
    })
    .catch(() => response.status(500).send(unableToUpdatePost500))
});

/// #####=- DELETE Individual Post Endpoint -=#####
server.delete('/posts/:postId', (request, response) => {

    const postId = request.params.postId;

    // Database Promise Method
    postDb.get(postId)
    .then(post => {
        if (!post) {
            response.status(400).send(userNotFound)
        }

        postDb.remove(postId)
        .then( didDelete => {
            if(!didDelete) {
                response.status(400).send(noPostsDeleted)
            }
            response.status(200).send(post) 
        })
        .catch(() => response.status(500).send(unableToDeletePost500))
    })
    .catch(() => response.status(500).send(unableToFindSinglePost500))
})

// #####=- Server Port Address and Listen Method -=#####
port = 9999;
server.listen(port, () => {console.log(`-=-=-=- Node Blog Server Active on Port ${port} -=-=-=-`)});