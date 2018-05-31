//node modules
const express = require('express');
// const cors = require('cors');

//database helpers
const postDB = require('./data/helpers/postDB.js')
const tagDB = require('./data/helpers/tagDb.js')
const userDB = require('./data/helpers/userDb')


// database helpers
const port = 5555;
const server = express();
server.use(express.json())
// server.use(cors({ origin: 'http://localhost:3000' }))

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

server.get('/', (req, res) => {
    res.send('Please work, website.')
});

server.get('/api/users', (req, res) => {
    userDB
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved", res)
        })
})
server.get('/api/posts', (req, res) => {
    postDB
        .get()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved", res)
        })
})
server.get('/api/tags', (req, res) => {
    tagDB
        .get()
        .then(tags => {
            res.json({ tags });
        })
        .catch(error => {
            sendUserError(500, "The tag information could not be retrieved", res)
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        sendUserError(400, "Please provide name for the user.", res)
    } else {
        userDB
            .insert({ name })
            .then(response => {
                res.status(201);
                res.json({ response })
            })
            .catch(error => {
                sendUserError(500, "There was an error saving the user to the database", res)
            })
    }
})
server.post('/api/posts', (req, res) => {
    const { userID, text } = req.body;
    if (!text || !userID) {
        sendUserError(400, "Please provide text and a userID for the post.", res)
    } else {
        postDB
            .insert({ userID, text })
            .then(response => {
                res.status(201);
                res.json({ response })
            })
            .catch(error => {
                sendUserError(500, "There was an error while saving the post to the database.", res)
            })
    }
})
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    postDB
        .get(id)
        .then(posts => {
            if (posts) {
                res.json({ posts })
            } else {
                sendUserError(404, "The post with the specified ID does not exist", res)
            }
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
        })
})

server.listen(port, () => console.log(`Server running on port ${port}`));