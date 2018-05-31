const express = require('express');
const cors = require('cors');
const port = 5000;
const server = express();

const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
};

// Users API

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if(user.length === 0) {
                sendUserError(404, `The user with the ID ${id} does not exist.`, res);
                return;
            }
            res.json({ user });
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    users
        .getUserPosts(id)
        .then(response => {
            if(response === 0) {
                sendUserError(404, `The user with the ID ${id} does not exist.`, res);
                return;
            }
            res.json({ response });
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        sendUserError(400, `Must provide a name for the user`, res);
        return;
    }
    users
        .insert({name})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        sendUserError(400, `User must have a name`, res);
        return;
    }
    users
        .update(id, {name})
        .then(user => {
            if(user.length === 0) {
                sendUserError(404, `The user with the ID ${id} does not exist.`, res);
                return;
            }
            users
                .get(id)
                .then(user => {
                    res.json({user});
                })
                .catch(error => {
                    sendUserError(500, `There was an error processing your request`, res);
                    return;
                })
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(response => {
            if(response === 0) {
                sendUserError(404, `The user with the ID ${id} does not exist.`, res);
                return;
            }
            res.json({ success: `User with ID ${id} removed`});
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});



server.listen(port, () => console.log(`Server is running on port ${port}`));