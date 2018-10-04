const express = require('express');

const server = express();

const logger = require('morgan');
const cors = require('cors');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

// function upper(obj) {
//     for (var name in obj) {
//         if (typeof obj["name"] === 'string') {
//             obj["name"] = obj["name"].toUpperCase();
//         }
//         if (typeof obj["name"] === 'object') {
//             upper(obj["name"]);
//         }
//     }
//     return obj;
// }

 const caps = (req, res, next) => {
     console.log(req.body);
    req.body.name = req.body.name.toUpperCase();
    next();
 }

server.use(logger('combined'));
server.use(cors());
server.use(express.json());

server.post('/posts', (req, res) => {
    console.log(req.body);
    const { text, postedBy } = req.body;
    const newPost = { text, postedBy };
    postDb.insert(newPost)

})

server.get('/', (req, res) => {
    res.send('Howdy Pardner!');
});

server.get('/users', (req, res) => {
    userDb.get()
    .then(users => {
        console.log('***USERS***', users);
        res.status(200).json(users);
    })
    .catch(() => res.status(500).json({ error: "The users could not be retrieved."}));
});

server.post('/users', caps, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser)
        .then(userId => {
            const { id } = userId;
            userDb.get(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "The user with the specified ID does not exist." });
                } else
                return res.status(201).json(user);
            })
            .catch(() => res.status(500).json({ error: "There was an error while saving the user."}));
        })
        .catch(() => res.status(400).json({ error: "Please provide a name for the user" }));
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.getUserPosts(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.send(err);
    });
});

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.remove(id)
    .then(removedUser => {
        console.log(removedUser);
        if (removedUser === 0) {
            return res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else
        return res.status(200).json(removedUser);
    })
    .catch(() => res.status(500).json({ error: "The user could not be removed" }));
});

server.put('/users/:id', caps, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    userDb.update(id, newUser)
    .then(user => {
        console.log('user = ', user);
        res.status(200).json(user);
    })
    .catch(() => res.status(500).json({ error: "The post information could not be modified."}));
});

const port = 9001;
server.listen(port, () => console.log(`The server is running on port ${port}, m'lady`));