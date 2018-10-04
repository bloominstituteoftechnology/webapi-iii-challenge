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

server.get('/users/:name', caps, (req, res) => {
    userDb.getUserPosts(req.id)
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
})

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