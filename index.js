const db = require('./data/dbConfig.js');
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const port = 8000;
server.listen(port, () =>
    console.log(`Server is listening to Port ${port}`)
)

// USER API
server.get('/api/users', (request, response) => {
    db.findUser()
        .then(users => {
            response.status(200).json(users);
        })
        .catch(error => response.send(error));
});

server.get('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.findUserById(id)
        .then(user => {
            response.status(200).json(user);
        })
        .catch(error => response.send(error))
});

server.post('/api/users', (request, response) => {
    const { name } = request.body;
    const newUser = { name };

    db.insertUser(newUser)
        .then(userID => {
            const { id } = userID;
            db.findUserById(id)
                .then(user => {
                    if (!user) {
                        return response
                            .status(422)
                            .send({ Error: `User does not exist at ID ${id}` });
                    } else if (!newUser.name) {
                        return response
                            .status(422)
                            .send({ Error: `Please enter a name for the user` });
                    } else if (newUser.name.length >= 128) {
                        return response
                            .status(422)
                            .send({ Error: `User name must be 128 or less characters` });
                    }
                    response.status(201).json(user);
                });
        })
        .catch(error => response.send(error));
})

server.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const { name } = request.body;
    const updatedUser = { name };

    db.updateUser(id, updatedUser)
        .then(user => {
            response.status(200).json(user);
        })
        .catch(error => response.send(error));
})

server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.removeUser(id)
        .then(removedUser => {
            response.status(200).json(removedUser);
        })
        .catch(error => response.send(error));
});

// POST API
server.get('/api/posts', (request, response) => {
    db.findPost()
        .then(posts => {
            response.status(200).json(posts);
        })
        .catch(error => response.send(error));
});

server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.findPostById(id)
        .then(post => {
            response.status(200).json(post);
        })
        .catch(error => response.send(error))
});

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

server.put('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    const { userID, text } = request.body;
    const updatedPost = { userID, text };

    db.updatePost(id, updatedPost)
        .then(post => {
            response.status(200).json(post);
        })
        .catch(error => response.send(error));
})

server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.removePost(id)
        .then(removedPost => {
            response.status(200).json(removedPost);
        })
        .catch(error => response.send(error));
});