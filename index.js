// pull in express
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// instanciate your server
const port = 8000;
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
server.use(express.json(), cors(), helmet(), logger('combined'));

// ======================= ERROR HELPER ========================

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};

// ===================== CUSTOM MIDDLEWARE =====================

const upperCase = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        errorHelper(404, 'Name must be included', res);
        next();
    } else {
        next();
    }
};

// ROUTES
server.get('/', (req, res) => {
    res.status(200).send('Hello from root!')
});

// ===================== USER ENDPOINTS =====================

server.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

server.get('/api/users/:id', upperCase, (req, res) => {
    const { id } = req.params;
    userDb
        .get(id)
        .then(user => {
            if (user === 0) {
                return errorHelper(404, 'User with that id not found', res);
            }
            res.status(200).json(user);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

server.post('/api/users', validateName, upperCase, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb
        .insert (newUser)
        .then(userId => {
            const { id } = userId;
            userDb
                .get(id)
                .then(user => {
                    if (!user) {
                    res
                        .status(400)
                        .json({ errorMessage: 'User with that id not found' });
                }
                res.status(200).json(user);
            })
            .catch(err => {
                return errorHelper(500, 'Database error', res);
            });
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb
        .remove(id)
        .then(deletedUser => {
            if(deletedUser === 0) {
                return errorHelper(404, 'User with that id not found');
            } else {
                res.status(201).json({ success: 'User deleted' });
            }
        })
        .catch(err => {
            return errorHelper(500, 'The user could not be removed', res );
        });
   
});

server.put('api/users/:id', validateName, upperCase, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userDb
        .update(id, { name })
        .then(response => {
            if (response === 0) {
                return errorHelper(404, `The user with the specified ID: ${id} does not exist.`)
            } else {
                userDb
                    .find(id)
                    .then(user => {
                        res.json(user);
                    })
                    .catch(err => {
                        return errorHelper(500, 'Database error', res);
                    });
            }
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

// ===================== POST ENDPOINTS =====================


server.get('/api/posts', (req, res) => {
    postDb
        .get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .get(id)
        .then(post => {
            if (post === 0) {
                return errorHelper(404, 'Post with that id not found', res);
            }
            res.status(200).json(post);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

server.post('/api/posts', (req, res) => {
    const { userId, text } = req.body;
    postDb
        .insert (userId, text)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .remove(id)
        .then(deletedPost => {
            if(deletedPost === 0) {
                return errorHelper(404, 'Post with that id not found');
            } else {
                res.status(201).json({ success: 'Post deleted' });
            }
        })
        .catch(err => {
            return errorHelper(500, 'The post could not be removed', res );
        });
   
});

server.put('api/posts/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    postDb
        .update(id, updatedPost)
        .then(response => {
            if (response === 0) {
                return errorHelper(404, `The post with the specified ID: ${id} does not exist.`)
            } else {
                postDb
                    .find(id)
                    .then(post => {
                        res.json(post);
                    })
                    .catch(err => {
                        return errorHelper(500, 'Database error', res);
                    });
            }
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});



server.listen(port, () => {
  console.log(`\n=== API running on port: ${port} ===\n`);
});
