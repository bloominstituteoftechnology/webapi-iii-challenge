const express = require('express');
const cors = require('cors');
const usersDb = require('./data/helpers/userDb');
const postsDb = require('./data/helpers/postDb');

// ~~~~~ SERVER INITIALIZATION ~~~~~ //
const server = express();
server.use(cors());
server.use(express.json());

// ~~~~~ MIDDLEWARE ~~~~~ //


// ~~~~~ ROUTES ~~~~~ //
server.get('/', (req, res) => {
    res.status(200).json({"message": "I AM ROOT!"});
});

// ~~ Users ~~ //
// {
//      id: number,
//      name: string  // required. < 129 char
// }

// ~~ Posts ~~ //
// {
//     id: number,
//     userId: number,  // required. ID of existing user
//     text: string  // required.
// }

// ~~ GET ~~ //
// user: get() -> [{},...,{}]
server.get('/api/users', (req, res) => {});

// post: get() -> [{},...,{}]
server.get('/api/posts', (req, res) => {});

// user: get(id) -> [{}]
server.post('/api/users/:id', (req, res) => {});

// post: get(id) -> [{}]
server.post('/api/posts/:id', (req, res) => {});

// user: getUserPosts(id) -> list of all posts by user
server.get('/api/userposts/:id', (req, res) => {});

// ~~ POST ~~ /
// user: insert({}) -> {id: ..}
server.post('/api/users', (req, res) => {});

// post: insert({}) -> {id: ..}
server.post('/api/posts', (req, res) => {});

// ~~ PUT ~~ //
// user: update(id, {}) -> count of updated records
server.put('/api/users/:id', (req, res) => {});

// post: update(id, {}) -> count of updated records
server.put('/api/posts/:id', (req, res) => {});

// ~~ DELETE ~~ //
// user: remove(id) -> # of records deleted
server.delete('/api/users/:id', (req, res) => {});

// post: remove(id) -> # of records deleted
server.delete('/api/posts/:id', (req, res) => {});


// ~~~~~ LISTENER ~~~~~ //
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
