// import your node modules
const express = require('express');
const cors = require('cors');

// database helpers
const posts = require('./data/helpers/postDb.js')
const users = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/tagDb.js')
// server.get('/api/users')
// server.get('/api/posts')
// server.get('/api/tags')

// add your server code starting here

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming data.
    res.send('Welcome to my server');
});

// Users CRUD operations

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
      sendUserError(400, 'Must provide a name', res);
      return;
    }
    users
        .insert(
            {
                name
            })
        .then(response => {
            users
                .get(response.id)
                .then(user => {
                    if(user.length === 0) {
                        sendUserError(404, "The user with the specified ID does not exist.", res);
                        return;
                    }
                    res.status(201).json(user);
                })
                .catch(error => {
                    sendUserError(500, "The user information could not be retrieved.", res)
                })
        })
        .catch(error => {
            sendUserError(500, '"There was an error while saving the user to the database" ', res);
        })
})

server.get("/api/users", (req, res) => {
    users
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            sendUserError(500, "The posts information could not be retrieved.", res)
        })
})

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if(user.length === 0) {
                sendUserError(404,"The user with the specified ID does not exist.", res);
                return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved.", res)
        })
})

server.get("/api/users/:id/posts", (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if(user.length === 0) {
                sendUserError(404,"The user with the specified ID does not exist.", res);
                return;
            }
            users
                .getUserPosts(id)
                .then(posts => {
                    if(posts.length === 0) {
                        sendUserError(404,"The user doesn't have posts already.", res);
                        return;
                    }
                    res.json(posts);
                })
                .catch(error => {
                    sendUserError(500, "The user information could not be retrieved.", res)
                })
        })
        .catch(error => {
            sendUserError(500, "The user posts could not be retrieved.", res)
        })
})

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if(user.length === 0) {
                sendUserError(404,"The user with the specified ID does not exist.", res);
                return;
            }
            users
                .remove(id)
                .then(isRemoved => {
                    if(isRemoved === 0) {
                        sendUserError(404, "The user with the specified ID does not exist.", res);
                        return;
                    }
                    res.json(user);
                })
                .catch(error => {
                    sendUserError(500, "The user could not be removed", res);
                })
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved.", res)
    })   
})

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if(!name) {
        sendUserError(400, "Please provide name for the user.", res);
        return;
    }
    users
        .update(id, {name})
        .then(updated => {
            if(!updated) {
                sendUserError(404, "The user with the specified ID does not exist.", res);
                return;
            }
            users
                .get(id)
                .then(user => {
                    if(user.length === 0) {
                        sendUserError(404,"The user with the specified ID does not exist.", res);
                        return;
                    }
                    res.json(user);
                })
                .catch(error => {
                    sendUserError(500, "The user information could not be retrieved.", res)
                })
        })
        .catch(error => {
            sendUserError(500, "The user information could not be modified.", res);
        })
})

// Posts CRUD operations

server.post('/api/posts', (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) {
      sendUserError(400, 'Must userId title and text', res);
      return;
    }
    users
        .get(userId)
        .then(user => {
            if(user.length === 0) {
                sendUserError(404,"The user with the specified ID does not exist.", res);
                return;
            }
            posts
                .insert(
                    {
                        userId, 
                        text
                    })
                .then(response => {
                    posts
                        .get(response.id)
                        .then(post => {
                            if(post.length === 0) {
                                sendUserError(404, "The post with the specified ID does not exist.", res);
                                return;
                            }
                            res.status(201).json(post);
                        })
                        .catch(error => {
                            sendUserError(500, "The post information could not be retrieved.", res)
                        })
                })
                .catch(error => {
                    sendUserError(500, '"There was an error while saving the post to the database" ', res);
                })
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved.", res)
        })
})

server.get("/api/posts", (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            sendUserError(500, "The posts information could not be retrieved.", res)
        })
})

server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            if(post.length === 0) {
                sendUserError(404,"The post with the specified ID does not exist.", res);
                return;
            }
            res.json(post);
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
        })
})

server.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(post => {
            if(post.length === 0) {
                sendUserError(404,"The post with the specified ID does not exist.", res);
                return;
            }
            const postRemoved = post;
            posts
                .remove(id)
                .then(isRemoved => {
                    if(isRemoved === 0) {
                        sendUserError(404, "The post with the specified ID does not exist.", res);
                        return;
                    }
                    res.json(post);
                })
                .catch(error => {
                    sendUserError(500, "The post could not be removed", res);
                })
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
    })   
})

server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if(!text) {
        sendUserError(400, "Please provide text for the post.", res);
        return;
    }
    posts
        .update(id, {text})
        .then(updated => {
            if(!updated) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            posts
                .get(id)
                .then(post => {
                    if(post.length === 0) {
                        sendUserError(404,"The post with the specified ID does not exist.", res);
                        return;
                    }
                    res.json(post);
                })
                .catch(error => {
                    sendUserError(500, "The post information could not be retrieved.", res)
                })
        })
        .catch(error => {
            sendUserError(500, "The post information could not be modified.", res);
        })
})


server.listen(port, () => console.log(`Server running on port ${port}`));


