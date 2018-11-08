const express = require('express');
const users = require('../data/helpers/userDb');
const posts = require('../data/helpers/postDb');
const server = express();
server.use(express.json());

const sendErrorMsg = (errCode, msg, res) => {
    res.status(errCode);
    res.json({ Error: msg });
}

// custom middleware

const upperCase = (req, res, next) => {
    console.log(req.params)
    req.body.name = req.body.name.toUpperCase();
    next();
};


// Users endpoints //


// new user

server
    .post('/api/users', upperCase, (req, res) => {
        const { name } = req.body;
        users
            .insert({ name })
            .then(response => {
                res.status(200).json({ name: `${req.body.name}` })
            })
            .catch(err => {
                return sendErrorMsg(500, 'Name is not added to DB', res)
            });

    });


//get users

server
    .get('/', (req, res) => {
        res.status(200).json({ api: 'running' });
    });

server
    .get('/api/users', (req, res) => {
        users
            .get()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                return sendErrorMsg(500, 'Users information could not be retrieded', res)
            });
    });

server
    .get('/api/users/:id', (req, res) => {
        const { id } = req.params;
        users
            .get(id)
            .then(user => {
                if (user[0]) {
                    sendErrorMsg(404, 'The post with the specified ID does not exist.', res);
                } else {
                    res.status(200).json(user);
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'No User by that Id', res);
            });
    });

//update user

server
    .put('/api/users/:id', upperCase, (req, res) => {
        const { id } = req.params;
        const changes = req.body;
        users
            .update(id, changes)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: `${count} name was updated` })
                } else {
                    return sendErrorMsg(400, 'id not found')
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'The name could not be modified');
            });
    });


//delete user

server
    .delete('/api/users/:id', (req, res) => {
        const { id } = req.params;
        users
            .remove(id)
            .then(count => {
                res.status(200).json({ message: `${count} name has been removed` })
            })
            .catch(err => {
                return sendErrorMsg(500, 'The user could not be removed', res);
            });
    });

//Posts Endpoints//


// New Post

server
    .post('/api/posts', async (req, res) => {
        try {
            const { text, userId } = req.body;
            const changes = req.body;
            if (!changes) {
                return sendErrorMsg(500, 'Both text and a UserId are required', res)
            }
            const id = await posts.insert({ text, userId });
            const post = await posts.get(id.id);
            res.status(200).json(post);
        } catch (err) {
            return sendErrorMsg(500, 'error post could not be added', res);
        }
    });

//get posts

server
    .get('/api/user/posts/:userId', (req, res) => {
        const { userId } = req.params;
        users
            .getUserPosts(userId)
            .then(userPost => {
                userPost === 0 ?
                    sendErrorMsg(404, 'There are no posts by that users', res) :
                    res.status(200).json(userPost)
            })
            .catch(err => {
                return sendErrorMsg(500, 'There was an error searching for posts');
            });
    });

server
    .get('/api/posts', (req, res) => {
        posts
            .get()
            .then(post => {
                res.status(200).json(post);
            })
            .catch(err => {
                return sendErrorMsg(500, 'Posts information could not be retrieded', res)
            });
    });

server
    .get('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        posts
            .get(id)
            .then(post => {
                if (post[0]) {
                    sendErrorMsg(404, 'The post with the specified ID does not exist.', res);
                } else {
                    res.status(200).json(post);
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'No User by that Id', res);
            });
    });

//update post

server
    .put('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        const { text, userId } = req.body;
        const changes = req.body;
        posts
            .update(id, changes)
            .then(count => {
                count === 0 ?
                    sendErrorMsg(500, 'Post id cannot be found', res) :
                    res.status(200).json({ message: `${count} post was updated` })
            })
            .catch(err => {
                return sendErrorMsg(500, `the post could not be updated`)
            });
    });


// delete post

server
    .delete('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        posts
            .remove(id)
            .then(count => {
                count === 0 ?
                    sendErrorMsg(500, 'The userId could not be found', res) :
                    res.status(200).json({ message: `${count} post has been removed` })
            })
            .catch(err => {
                return sendErrorMsg(500, 'The user could not be removed', res);
            });
    });

module.exports = server;