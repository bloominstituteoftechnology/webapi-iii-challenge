const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
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
    userDb
        .get()
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

    userDb
        .get(id)
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
    } else if (newUser.name.length > 128) {
        return response
            .status(400)
            .send({ Error: "User name must be 128 or less characters" });
    }

    userDb
        .insert(newUser)
        .then(userID => {
            const { id } = userID;
            userDb
                .get(id)
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

    userDb
        .update(id, updatedUser)
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

    userDb
        .remove(id)
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
    postDb
        .get()
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

    postDb
        .get(id)
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

server.post('/api/posts', (request, response) => {
    const userID = request.body.userID;
    const text = request.body.text;
    const newPost = { userID, text };

    if (!newPost.userID || !newPost.text) {
        return response
            .status(400)
            .send({ Error: "Missing userID or text for the post" });
    }

    postDb
        .insert(newPost)
        .then(post => {
            postDb
                .get(post.id)
                .then(posted => {
                    return response
                        .status(201)
                        .json(posted);
                });
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "There was an error while saving the user" })
        });
});

server.put('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    const text = request.body.text;
    const updatedPost = { text };

    if (!id) {
        return response
            .status(404)
            .send({ Error: `Post with the following ID does not exist: ${id}` });
    } else if (!updatedPost.text) {
        return response
            .status(400)
            .send({ Error: "Please enter text for the post" });
    }

    postDb
        .update(id, updatedPost)
        .then(post => {
            return response
                .status(200)
                .json(post);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The post info could not be modified" })
        });
});

server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    if (!id) {
        return response
            .status(404)
            .json({ Error: `There is no post with the following ID: ${id}` })
    }

    postDb
        .remove(id)
        .then(removedUser => {
            return response
                .status(200)
                .json(removedUser);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The post could not be removed" })
        });
});