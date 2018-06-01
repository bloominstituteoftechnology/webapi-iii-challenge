// express
// cors

const express = require('express');
const cors = require('cors');

// database helpers
// const posts = require('./data/helpers/postDb.js')
// const users = require('./data/helpers/userDb.js')
// const tags = require('./data/helpers/tagDb.js')

const usersDb = require('./data/helpers/userDb.js');
const postsDb = require('./data/helpers/postDb.js');
const tagsDb = require('./data/helpers/tagDb.js');

const port = 5353;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

// const customLogger = (req, res, next) => {
//     const ua = req.headers['user-agent'];
//     console.log(req.headers);
//     const { path } = req;
//     const timeStamp = Date.now();
//     const log = { path, ua, timeStamp };
//     const stringLog = JSON.stringify(log);
//     console.log(stringLog);
//     next();
// };

// server.use(customLogger);

const searchMiddleWare = (req, res, next) => {
    if (!req.query.name) {
        next();
    }
    usersDb
        .find()
        .then(users => {
            const { name } = req.query;
            const filteredUsers = users.filter(
                user => user.name.toLowerCase() === name.toLowerCase()
            );
            req.users = filteredUsers;
            next();
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Something bad happened to server.' });
        });
};

// server.get('/api/users')

server.get('/', searchMiddleWare, (req, res) => {
    console.log(req.query);
    console.log(req.users);
    const { users } = req;
    if (!users) {
        res.json('Welcome to express, human!');
    }
    if (users.length === 0) {
        sendUserError(404, `No ${req.query.name} in our database`, res);
        return;
    } else {
        res.json({ users });
    }
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        sendUserError(400, 'Must provide name', res);
        return;
    }
    usersDb
        .insert({ name })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            sendUserError(400, error, res);
            return;
        });
});

server.get('/api/users', (req, res) => {
    usersDb
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, `The user's information could not be retrieved.`, res);
            return;
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersDb
        .getUserPosts(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, 'User with that ID not found.', res);
                return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, 'Error looking up user.', res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersDb
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The user with that ID does not exist.', res);
                return;
            }
            res.json({ success: `User with id: ${id} removed from system.` });
        })
        .catch(error => {
            sendUserError(500, 'The user could not be removed.', res);
            return;
        });
    });

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        sendUserError(400, 'Must provide name.', res);
        return;
    }
    usersDb
        .update(id, {name})
        .then(response => {
            res.status(201).json(response);
        });
});

// server.get('/api/posts')

server.post('/api/posts', (req, res) => {
    const { name } = req.body;
    if (!name) {
        sendUserError(400, 'Must provide name', res);
        return;
    }
    usersDb
        .insert({ name })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            sendUserError(400, error, res);
            return;
        });
});

server.get('/api/users', (req, res) => {
    usersDb
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, `The user's information could not be retrieved.`, res);
            return;
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersDb
        .getUserPosts(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, 'User with that ID not found.', res);
                return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, 'Error looking up user.', res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersDb
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The user with that ID does not exist.', res);
                return;
            }
            res.json({ success: `User with id: ${id} removed from system.` });
        })
        .catch(error => {
            sendUserError(500, 'The user could not be removed.', res);
            return;
        });
    });

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        sendUserError(400, 'Must provide name.', res);
        return;
    }
    usersDb
        .update(id, {name})
        .then(response => {
            res.status(201).json(response);
        });
});

// server.get('/api/tags')

server.listen(port, () => console.log(`Server running on port ${port}.`));
