const db = require('./data/dbConfig.js');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const toCaps = (request, response, next) => {
    request.name = request.body.name.toUpperCase();
    next();
};

const port = 8000;
server.listen(port, () =>
    console.log(`Server is listening to Port ${port}`)
);

// USER API
server.get('/api/users', (request, response) => {
    db.findUser()
        .then(users => {
            return response
                .status(200)
                .json(users);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "Could not find list of users." })
        });
});

server.get('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.findUserById(id)
        .then(user => {
            if (!user) {
                return response
                    .status(404)
                    .json({ Error: "Could not find user." })
            } else return response
                .status(200)
                .json(user);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "User info could not be retrieved." })
        });
});

server.post('/api/users', toCaps, (request, response) => {
    const name = request.name;
    const newUser = { name };

    if (!newUser.name) {
        return response
            .status(400)
            .send({ Error: "Please enter a name for the user" });
    } else if (newUser.name.length >= 128) {
        return response
            .status(400)
            .send({ Error: "User name must be 128 or less characters" });
    }

    db.insertUser(newUser)
        .then(userID => {
            const { id } = userID;
            db.findUserById(id)
                .then(user => {
                    return response
                        .status(201)
                        .json(user);
                });
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "There was an error while saving the user" })
        });
});

server.put('/api/users/:id', toCaps, (request, response) => {
    const id = request.params.id;
    const name = request.name;
    const updatedUser = { name };

    if (!id) {
        return response
            .status(404)
            .send({ Error: `User with the following ID does not exist: ${id}` });
    } else if (!updatedUser.name) {
        return response
            .status(400)
            .send({ Error: "Please enter a name for the user" });
    }

    db.updateUser(id, updatedUser)
        .then(user => {
            return response
                .status(200)
                .json(user);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The user info could not be modified" })
        });
});

server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;

    if (!id) {
        return response
            .status(404)
            .json({ Error: `There is no user with the following ID: ${id}` })
    }

    db.removeUser(id)
        .then(removedUser => {
            return response
                .status(200)
                .json(removedUser);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The user could not be removed" })
        });
});

// POST API
server.get('/api/posts', (request, response) => {
    db.findPost()
        .then(posts => {
            return response
                .status(200)
                .json(posts);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "Could not find list of posts." })
        });
});

server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.findPostById(id)
        .then(post => {
            if (!post) {
                return response
                    .status(404)
                    .json({ Error: "Could not find post." })
            } else return response
                .status(200)
                .json(post);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "Post info could not be retrieved." })
        });
});

// server.post('/api/posts', (request, response) => {
//     const postID = request.postID;
//     const text = request.text;
//     const newPost = { postID, text };

//     if (!newPost.postID || !newPost.text) {
//         return response
//             .status(400)
//             .send({ Error: "Missing postID or text for the post" });
//     } else if (newPost.postID !== request.postID) {
//         return response
//             .status(400)
//             .send({ Error: "This postID does not match the user ID" });
//     }

//     db.insertPost(newPost)
//         .then(postID => {
//             const { postID } = postID;
//             db.findPostById(postID)
//                 .then(post => {
//                     return response
//                         .status(201)
//                         .json(post);
//                 });
//         })
//         .catch(() => {
//             return response
//                 .status(500)
//                 .json({ Error: "There was an error while saving the user" })
//         });
// });

// server.put('/api/posts/:id', (request, response) => {
//     const id = request.params.id;
//     const postID = request.postID;
//     const text = request.text;
//     const updatedPost = { postID, text };

//     if (!id) {
//         return response
//             .status(404)
//             .send({ Error: `Post with the following ID does not exist: ${id}` });
//     } else if (!updatedPost.postID || !updatedPost.text) {
//         return response
//             .status(400)
//             .send({ Error: "Please enter a name for the user" });
//     }

//     db.updatePost(id, updatedPost)
//         .then(post => {
//             return response
//                 .status(200)
//                 .json(post);
//         })
//         .catch(() => {
//             return response
//                 .status(500)
//                 .json({ Error: "The user info could not be modified" })
//         });
// });

server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    if (!id) {
        return response
            .status(404)
            .json({ Error: `There is no post with the following ID: ${id}` })
    }

    db.removePost(id)
        .then(removedUser => {
            return response
                .status(200)
                .json(removedUser);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The user could not be removed" })
        });
});