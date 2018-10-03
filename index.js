const db = require('./data/db.js');
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
    db.find()
        .then(users => {
            response.status(200).json(users);
        })
        .catch(error => response.send(error));
});

server.get('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.findById(id)
        .then(user => {
            response.status(200).json(user);
        })
        .catch(error => response.send(error))
});

server.post('/api/users', (request, response) => {
    const { name } = request.body;
    const newUser = { name };

    db.insert(newUser)
        .then(userID => {
            const { id } = userID;
            db.findById(id)
                .then(user => {
                    if (!user) {
                        return response
                            .status(422)
                            .send({ Error: `User does not exist at ID ${id}` });
                    } else if (newUser.name.length <= 128) {
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
    const { title, contents } = request.body;
    const updatedUser = { title, contents };

    db.update(id, updatedUser)
        .then(user => {
            response.status(200).json(user);
        })
        .catch(error => response.send(error));
})

server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;

    db.remove(id)
        .then(removedUser => {
            response.status(200).json(removedUser);
        })
        .catch(error => response.send(error));
});

// POST API
server.get('/api/posts', (request, response) => {
    db.find()
        .then(posts => {
            response.status(200).json(posts);
        })
        .catch(error => response.send(error));
});

server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.findById(id)
        .then(post => {
            response.status(200).json(post);
        })
        .catch(error => response.send(error))
});

// THIS NEEDS TO BE UPDATED WITH SCHEMA
// server.post('/api/posts', (request, response) => {
//     const { title, contents } = request.body;
//     const newPost = { title, contents };

//     db.insert(newPost)
//         .then(postID => {
//             const { id } = postID;
//             db.findById(id)
//                 .then(post => {
//                     if (!post) {
//                         return response
//                             .status(422)
//                             .send({ Error: `Post does not exist at ID ${id}` });
//                     } else if (!newPost.title || !newPost.contents) {
//                         return response
//                             .status(422)
//                             .send({ Error: `Post missing title or contents` });
//                     }
//                     response.status(201).json(post);
//                 });
//         })
//         .catch(error => response.send(error));
// })

server.put('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    const { title, contents } = request.body;
    const updatedPost = { title, contents };

    db.update(id, updatedPost)
        .then(post => {
            response.status(200).json(post);
        })
        .catch(error => response.send(error));
})

server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.remove(id)
        .then(removedPost => {
            response.status(200).json(removedPost);
        })
        .catch(error => response.send(error));
});