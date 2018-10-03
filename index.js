const db = require('./data/dbConfig.js');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const toCaps = (request, response, next) => {
    console.log(request.params);
    request.name = request.params.name.toUpperCase();
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
                .json({ Error: "Could not find list of users."})
        });
});

server.get('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.findUserById(id)
        .then(user => {
            if(!user) {
                return response
                    .status(404)
                    .json({ Error: "Could not find user."})
            } else return response
                    .status(200)
                    .json(user);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "User info could not be retrieved."})
        });
});

server.post('/api/users', toCaps, (request, response) => {
    const { name } = request.body;
    const newUser = { name };

    db.insertUser(newUser)
        .then(userID => {
            const { id } = userID;
            db.findUserById(id)
                .then(user => {
                    if (!newUser.name) {
                        return response
                            .status(400)
                            .send({ Error: "Please enter a name for the user" });
                    } else if (newUser.name.length >= 128) {
                        return response
                            .status(400)
                            .send({ Error: "User name must be 128 or less characters" });
                    } else return response
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
    const { name } = request.body;
    const updatedUser = { name };

    db.updateUser(id, updatedUser)
        .then(user => {
            if(!id) {
                return response
                    .status(404)
                    .send({ Error: `User with the following ID does not exist: ${id}` });
            } else if(!updatedUser.name) {
                return response
                    .status(400)
                    .send({ Error: "Please enter a name for the user" });
            } else return response
                    .status(200)
                    .json(user);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The user info could not be modified"})
        });
});

server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.removeUser(id)
        .then(removedUser => {
            if(!id) {
                return response
                    .status(404)
                    .json({ Error: `There is no user with the following ID: ${id}` })
            } else return response
                    .status(200)
                    .json(removedUser);
        })
        .catch(() => { 
            return response
                .status(500)
                .json({ Error: "The user could not be removed"})
    });
});

// POST API
// server.get('/api/posts', (request, response) => {
//     db.findPost()
//         .then(posts => {
//             response.status(200).json(posts);
//         })
//         .catch(error => response.send(error));
// });

// server.get('/api/posts/:id', (request, response) => {
//     const id = request.params.id;

//     db.findPostById(id)
//         .then(post => {
//             response.status(200).json(post);
//         })
//         .catch(error => response.send(error))
// });

// THIS NEEDS TO BE UPDATED WITH SCHEMA
// server.post('/api/posts', (request, response) => {
//     const { userID, text } = request.body;
//     const newPost = { userID, text };

//     db.insertPost(newPost)
//         .then(postID => {
//             const { id } = postID;
//             db.findPostById(id)
//                 .then(post => {
//                     if (!post) {
//                         return response
//                             .status(422)
//                             .send({ Error: `Post does not exist at ID ${id}` });
//                     } else if (!newPost.userID || !newPost.text) {
//                         return response
//                             .status(422)
//                             .send({ Error: `Post missing userID or text` });
//                     }
//                     response.status(201).json(post);
//                 });
//         })
//         .catch(error => response.send(error));
// })

// server.put('/api/posts/:id', (request, response) => {
//     const id = request.params.id;
//     const { userID, text } = request.body;
//     const updatedPost = { userID, text };

//     db.updatePost(id, updatedPost)
//         .then(post => {
//             response.status(200).json(post);
//         })
//         .catch(error => response.send(error));
// })

// server.delete('/api/posts/:id', (request, response) => {
//     const id = request.params.id;

//     db.removePost(id)
//         .then(removedPost => {
//             response.status(200).json(removedPost);
//         })
//         .catch(error => response.send(error));
// });